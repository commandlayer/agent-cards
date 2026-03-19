import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const commonsVerbs = ["analyze", "classify", "clean", "convert", "describe", "explain", "fetch", "format", "parse", "summarize"];
const commercialVerbs = ["authorize", "checkout", "purchase", "ship", "verify"];
const expectedV11 = {
  commons: commonsVerbs.map((verb) => `${verb}agent.eth.json`),
  commercial: commercialVerbs.map((verb) => `${verb}agent.eth.json`)
};

const VALIDATION_MODES = new Set(["current", "legacy", "all"]);
const CURRENT_DESCRIPTOR_PATHS = [
  ".well-known/agent.json",
  ".well-known/agent-cards-v1.1.0.json"
];

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

function getMode() {
  const arg = process.argv.find((value) => value.startsWith("--mode="));
  if (!arg) return "current";
  const mode = arg.slice("--mode=".length);
  if (!VALIDATION_MODES.has(mode)) {
    console.error(`❌ Unknown validation mode: ${mode}. Expected one of: ${[...VALIDATION_MODES].join(", ")}`);
    process.exit(1);
  }
  return mode;
}

function loadJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function readJson(fullPath) {
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function collectJsonFiles(relativeRoot) {
  const root = path.join(ROOT, relativeRoot);
  if (!fs.existsSync(root)) return [];
  const out = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
    }
  }
  walk(root);
  return out.sort();
}

function fail(message, details) {
  console.error(`❌ ${message}`);
  if (details) console.error(details);
  process.exitCode = 1;
}

const descriptorValidate = ajv.compile(loadJson("schemas/v1.1.0/agent.descriptor.schema.json"));
const v10Validate = ajv.compile(loadJson("schemas/v1.0.0/_shared/agent.card.base.schema.json"));
const v11Validate = ajv.compile(loadJson("schemas/v1.1.0/agent.card.schema.json"));

function validateDescriptor(relativePath) {
  const data = loadJson(relativePath);
  if (!descriptorValidate(data)) fail(`${relativePath} failed descriptor validation.`, descriptorValidate.errors);
  else console.log(`✅ Descriptor valid: ${relativePath}`);
}

function validateExpectedV11Set() {
  for (const tier of Object.keys(expectedV11)) {
    const dir = path.join(ROOT, "agents", "v1.1.0", tier);
    const actual = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort();
    const expected = [...expectedV11[tier]].sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      fail(`agents/v1.1.0/${tier} does not match the authoritative card set.`, { expected, actual });
    } else {
      console.log(`✅ Authoritative card set present: agents/v1.1.0/${tier}`);
    }
  }
}

function validateCurrentCard(fullPath) {
  const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
  const [, folderVersion, tier, fileName] = relativePath.split("/");
  const card = readJson(fullPath);

  if (!v11Validate(card)) {
    fail(`Agent Card failed schema validation: ${relativePath}`, v11Validate.errors);
    return;
  }

  const primaryVerb = card.implements[0];
  const expectedId = `https://commandlayer.org/agent-cards/${relativePath}`;
  const expectedEntry = `x402://${card.ens}/${primaryVerb}/v${card.version}`;
  const expectedSchema = "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json";
  const rawCommons = /^https:\/\/raw\.githubusercontent\.com\/commandlayer\/protocol-commons\/refs\/tags\/v1\.1\.0\/schemas\/v1\.1\.0\/commons\/([^/]+)\/\1\.(request|receipt)\.schema\.json$/;
  const rawCommercial = /^https:\/\/raw\.githubusercontent\.com\/commandlayer\/protocol-commercial\/refs\/tags\/v1\.1\.0\/schemas\/v1\.1\.0\/commercial\/([^/]+)\/\1\.(request|receipt)\.schema\.json$/;
  const mirrorCommons = /^https:\/\/commandlayer\.org\/schemas\/v1\.1\.0\/commons\/([^/]+)\/\1\.(request|receipt)\.schema\.json$/;
  const mirrorCommercial = /^https:\/\/commandlayer\.org\/schemas\/v1\.1\.0\/commercial\/([^/]+)\/\1\.(request|receipt)\.schema\.json$/;

  if (card.version !== folderVersion.replace(/^v/, "")) fail(`${relativePath}: version mismatch.`);
  if (card.$id !== expectedId) fail(`${relativePath}: $id mismatch.`);
  if (card.$schema !== expectedSchema) fail(`${relativePath}: stale or invalid $schema.`);
  if (card.entry !== expectedEntry) fail(`${relativePath}: entry mismatch.`);
  if (card.id !== card.ens) fail(`${relativePath}: id must equal ens.`);
  if (card.class !== tier) fail(`${relativePath}: class mismatch.`);
  if (fileName !== `${card.ens}.json`) fail(`${relativePath}: filename mismatch.`);
  if (new Date(card.updated_at).getTime() < new Date(card.created_at).getTime()) fail(`${relativePath}: updated_at must be >= created_at.`);
  if (JSON.stringify(card).includes("_shared")) fail(`${relativePath}: current v1.1.0 card must not reference _shared.`);

  if (tier === "commons") {
    if (!rawCommons.test(card.schemas.request) || !rawCommons.test(card.schemas.receipt)) fail(`${relativePath}: stale Commons source schema paths.`);
    if (!mirrorCommons.test(card.schemas_mirror.request) || !mirrorCommons.test(card.schemas_mirror.receipt)) fail(`${relativePath}: stale Commons mirror schema paths.`);
  }
  if (tier === "commercial") {
    if (!rawCommercial.test(card.schemas.request) || !rawCommercial.test(card.schemas.receipt)) fail(`${relativePath}: stale Commercial source schema paths.`);
    if (!mirrorCommercial.test(card.schemas_mirror.request) || !mirrorCommercial.test(card.schemas_mirror.receipt)) fail(`${relativePath}: stale Commercial mirror schema paths.`);
  }
  if (!card.schemas.request.includes(`/${primaryVerb}/`) || !card.schemas.receipt.includes(`/${primaryVerb}/`)) fail(`${relativePath}: schema URLs must match implements[0].`);

  console.log(`✅ Current Agent Card valid: ${relativePath}`);
}

function validateLegacyCard(fullPath) {
  const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
  const [, folderVersion, tier, fileName] = relativePath.split("/");
  const card = readJson(fullPath);

  if (!v10Validate(card)) {
    fail(`Legacy Agent Card failed schema validation: ${relativePath}`, v10Validate.errors);
    return;
  }

  const primaryVerb = card.implements[0];
  const expectedId = `https://commandlayer.org/agent-cards/${relativePath}`;
  const expectedEntry = `x402://${card.ens}/${primaryVerb}/v${card.version}`;
  const semverFolder = folderVersion.replace(/^v/, "");
  const serialized = JSON.stringify(card);

  if (card.version !== semverFolder) fail(`${relativePath}: version mismatch.`);
  if (card.$id !== expectedId) fail(`${relativePath}: $id mismatch.`);
  if (card.entry !== expectedEntry) fail(`${relativePath}: entry mismatch.`);
  if (card.id !== card.ens) fail(`${relativePath}: id must equal ens.`);
  if (card.class !== tier) fail(`${relativePath}: class mismatch.`);
  if (fileName !== `${card.ens}.json`) fail(`${relativePath}: filename mismatch.`);
  if (new Date(card.updated_at).getTime() < new Date(card.created_at).getTime()) fail(`${relativePath}: updated_at must be >= created_at.`);
  if (/COMMERCIAL_SCHEMAS_CID|example\.com|placeholder|your-domain|REPLACE_ME|TODO|TBD/i.test(serialized)) fail(`${relativePath}: contains placeholder or template content.`);

  console.log(`✅ Legacy Agent Card valid: ${relativePath}`);
}

function runCurrentValidation() {
  console.log("▶ Validating current canonical line (v1.1.0 + discovery)...");
  for (const descriptorPath of CURRENT_DESCRIPTOR_PATHS) validateDescriptor(descriptorPath);
  validateExpectedV11Set();
  for (const file of collectJsonFiles("agents/v1.1.0")) validateCurrentCard(file);
}

function runLegacyValidation() {
  console.log("▶ Validating legacy compatibility line (v1.0.0)...");
  for (const file of collectJsonFiles("agents/v1.0.0")) validateLegacyCard(file);
}

function main() {
  const mode = getMode();

  if (mode === "current" || mode === "all") runCurrentValidation();
  if (mode === "legacy" || mode === "all") runLegacyValidation();

  if (process.exitCode) process.exit(process.exitCode);
  if (mode === "current") console.log("✅ Current canonical validation completed successfully.");
  else if (mode === "legacy") console.log("✅ Legacy compatibility validation completed successfully.");
  else console.log("✅ All current and legacy card validations completed successfully.");
}

main();

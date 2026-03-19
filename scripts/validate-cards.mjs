import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PLACEHOLDER_PATTERNS = ["COMMERCIAL_SCHEMAS_CID", "COMMONS_SCHEMAS_CID", "example.com", "<placeholder>"];

const commonsVerbs = ["analyze", "classify", "clean", "convert", "describe", "explain", "fetch", "format", "parse", "summarize"];
const commercialVerbs = ["authorize", "checkout", "purchase", "ship", "verify"];
const expectedV11 = {
  commons: commonsVerbs.map((verb) => `${verb}agent.eth.json`),
  commercial: commercialVerbs.map((verb) => `${verb}agent.eth.json`)
};

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

function getMode() {
  const arg = process.argv.find((value) => value.startsWith("--mode="));
  const mode = arg ? arg.split("=")[1] : "release";
  if (!["current", "legacy", "release"].includes(mode)) {
    throw new Error(`Unsupported validation mode: ${mode}`);
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
  if (!descriptorValidate(data)) {
    fail(`${relativePath} failed descriptor validation.`, descriptorValidate.errors);
    return;
  }
  console.log(`✅ Descriptor valid: ${relativePath}`);
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

function validateCard(fullPath) {
  const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
  const [, folderVersion, tier, fileName] = relativePath.split("/");
  const card = readJson(fullPath);
  const validate = folderVersion === "v1.1.0" ? v11Validate : v10Validate;

  if (!validate(card)) {
    fail(`Agent Card failed schema validation: ${relativePath}`, validate.errors);
    return;
  }

  const primaryVerb = card.implements[0];
  const expectedId = `https://commandlayer.org/agent-cards/${relativePath}`;
  const expectedEntry = `x402://${card.ens}/${primaryVerb}/v${card.version}`;
  const semverFolder = folderVersion.replace(/^v/, "");

  if (card.version !== semverFolder) fail(`${relativePath}: version mismatch.`);
  if (card.$id !== expectedId) fail(`${relativePath}: $id mismatch.`);
  if (card.entry !== expectedEntry) fail(`${relativePath}: entry mismatch.`);
  if (card.id !== card.ens) fail(`${relativePath}: id must equal ens.`);
  if (card.class !== tier) fail(`${relativePath}: class mismatch.`);
  if (fileName !== `${card.ens}.json`) fail(`${relativePath}: filename mismatch.`);
  if (new Date(card.updated_at).getTime() < new Date(card.created_at).getTime()) fail(`${relativePath}: updated_at must be >= created_at.`);

  if (folderVersion === "v1.1.0") {
    const expectedSchema = "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json";
    const expectedSourceRoot = tier === "commons"
      ? "https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons"
      : "https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial";
    const expectedMirrorRoot = tier === "commons"
      ? "https://commandlayer.org/schemas/v1.1.0/commons"
      : "https://commandlayer.org/schemas/v1.1.0/commercial";

    if (card.$schema !== expectedSchema) fail(`${relativePath}: stale or invalid $schema.`);
    if (JSON.stringify(card).includes("_shared")) fail(`${relativePath}: current v1.1.0 card must not reference _shared.`);

    const expectedRequest = `${expectedSourceRoot}/${primaryVerb}/${primaryVerb}.request.schema.json`;
    const expectedReceipt = `${expectedSourceRoot}/${primaryVerb}/${primaryVerb}.receipt.schema.json`;
    const expectedMirrorRequest = `${expectedMirrorRoot}/${primaryVerb}/${primaryVerb}.request.schema.json`;
    const expectedMirrorReceipt = `${expectedMirrorRoot}/${primaryVerb}/${primaryVerb}.receipt.schema.json`;

    if (card.schemas.request !== expectedRequest || card.schemas.receipt !== expectedReceipt) {
      fail(`${relativePath}: stale ${tier === "commons" ? "Commons" : "Commercial"} source schema paths.`);
    }
    if (card.schemas_mirror.request !== expectedMirrorRequest || card.schemas_mirror.receipt !== expectedMirrorReceipt) {
      fail(`${relativePath}: stale ${tier === "commons" ? "Commons" : "Commercial"} mirror schema paths.`);
    }
  }

  if (folderVersion === "v1.0.0") {
    const text = JSON.stringify(card);
    const placeholder = PLACEHOLDER_PATTERNS.find((pattern) => text.includes(pattern));
    if (placeholder) fail(`${relativePath}: contains legacy placeholder content (${placeholder}).`);
  }

  console.log(`✅ Agent Card valid: ${relativePath}`);
}

function validateCurrentLine() {
  console.log("▶ Validating current canonical release line (v1.1.0).");
  validateDescriptor(".well-known/agent.json");
  validateDescriptor(".well-known/agent-cards-v1.1.0.json");
  validateExpectedV11Set();
  for (const file of collectJsonFiles("agents/v1.1.0")) validateCard(file);
}

function validateLegacyLine() {
  console.log("▶ Validating legacy compatibility line (v1.0.0).");
  for (const file of collectJsonFiles("agents/v1.0.0")) validateCard(file);
}

function main() {
  const mode = getMode();
  if (mode === "current" || mode === "release") validateCurrentLine();
  if (mode === "legacy" || mode === "release") validateLegacyLine();
  if (process.exitCode) process.exit(process.exitCode);
  console.log(`✅ ${mode === "release" ? "Release" : mode[0].toUpperCase() + mode.slice(1)} validation completed successfully.`);
}

main();

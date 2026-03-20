import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CURRENT_LINE = "v1.1.0";
const CURRENT_SEMVER = CURRENT_LINE.replace(/^v/, "");
const CARD_HTTP_ROOT = `https://commandlayer.org/agent-cards/agents/${CURRENT_LINE}`;
const PLACEHOLDER_PATTERNS = ["example.com", "placeholder", "changeme", "your-", "TODO"];
const SOURCE_ROOTS = {
  commons: `https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/${CURRENT_LINE}/schemas/${CURRENT_LINE}/commons`,
  commercial: `https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/${CURRENT_LINE}/schemas/${CURRENT_LINE}/commercial`
};
const MIRROR_ROOTS = {
  commons: `https://commandlayer.org/schemas/${CURRENT_LINE}/commons`,
  commercial: `https://commandlayer.org/schemas/${CURRENT_LINE}/commercial`
};

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

function asRelative(fullPath) {
  return path.relative(ROOT, fullPath).replace(/\\/g, "/");
}

function compareArrays(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(message, { expected, actual });
}

function expectEqual(actual, expected, message) {
  if (actual !== expected) fail(message, { expected, actual });
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
    const dir = path.join(ROOT, "agents", CURRENT_LINE, tier);
    const actual = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort();
    const expected = [...expectedV11[tier]].sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      fail(`agents/${CURRENT_LINE}/${tier} does not match the authoritative card set.`, { expected, actual });
    } else {
      console.log(`✅ Authoritative card set present: agents/${CURRENT_LINE}/${tier}`);
    }
  }
}

function validateCard(fullPath) {
  const relativePath = asRelative(fullPath);
  const [, folderVersion, tier, fileName] = relativePath.split("/");
  const card = readJson(fullPath);
  const validate = folderVersion === CURRENT_LINE ? v11Validate : v10Validate;
  if (!validate(card)) {
    fail(`Agent Card failed schema validation: ${relativePath}`, validate.errors);
    return null;
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

  if (folderVersion === CURRENT_LINE) {
    const expectedSchema = `https://commandlayer.org/agent-cards/schemas/${CURRENT_LINE}/agent.card.schema.json`;
    const expectedSourceRoot = SOURCE_ROOTS[tier];
    const expectedMirrorRoot = MIRROR_ROOTS[tier];
    if (card.$schema !== expectedSchema) fail(`${relativePath}: stale or invalid $schema.`);
    if (JSON.stringify(card).includes("_shared")) fail(`${relativePath}: current ${CURRENT_LINE} card must not reference _shared.`);

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
  return { relativePath, card, tier, primaryVerb };
}

function validateManifestAgainstCards(cardRecords) {
  const manifest = loadJson("meta/manifest.json");
  const cardMap = new Map(cardRecords.map((record) => [record.relativePath, record]));
  const manifestMap = new Map();

  for (const entry of manifest.entries) {
    const url = new URL(entry.agent_card);
    const relativePath = decodeURIComponent(url.pathname.replace(/^\/agent-cards\//, ""));
    if (manifestMap.has(relativePath)) fail(`meta/manifest.json: duplicate manifest entry for ${relativePath}.`);
    manifestMap.set(relativePath, entry);

    const record = cardMap.get(relativePath);
    if (!record) {
      fail(`meta/manifest.json: manifest entry points to missing card file ${relativePath}.`);
      continue;
    }

    const { card, primaryVerb, tier } = record;
    expectEqual(entry.id, card.id, `meta/manifest.json: id mismatch for ${relativePath}.`);
    expectEqual(entry.version, card.version, `meta/manifest.json: version mismatch for ${relativePath}.`);
    expectEqual(entry.class, card.class, `meta/manifest.json: class mismatch for ${relativePath}.`);
    compareArrays(entry.networks, card.networks, `meta/manifest.json: networks mismatch for ${relativePath}.`);
    expectEqual(entry.status, card.status, `meta/manifest.json: status mismatch for ${relativePath}.`);
    expectEqual(entry.verb, primaryVerb, `meta/manifest.json: verb mismatch for ${relativePath}.`);
    expectEqual(entry.agent_card, card.$id, `meta/manifest.json: agent_card mismatch for ${relativePath}.`);
    expectEqual(entry.schema_request, card.schemas.request, `meta/manifest.json: schema_request mismatch for ${relativePath}.`);
    expectEqual(entry.schema_receipt, card.schemas.receipt, `meta/manifest.json: schema_receipt mismatch for ${relativePath}.`);
    expectEqual(entry.schema_request_mirror, card.schemas_mirror.request, `meta/manifest.json: schema_request_mirror mismatch for ${relativePath}.`);
    expectEqual(entry.schema_receipt_mirror, card.schemas_mirror.receipt, `meta/manifest.json: schema_receipt_mirror mismatch for ${relativePath}.`);
    expectEqual(entry.entry, card.entry, `meta/manifest.json: entry mismatch for ${relativePath}.`);
    expectEqual(relativePath, `agents/${CURRENT_LINE}/${tier}/${card.ens}.json`, `meta/manifest.json: non-canonical manifest path for ${relativePath}.`);
  }

  for (const relativePath of cardMap.keys()) {
    if (!manifestMap.has(relativePath)) fail(`meta/manifest.json: missing manifest entry for ${relativePath}.`);
  }

  expectEqual(manifest.entries.length, cardRecords.length, "meta/manifest.json: entry count must match indexed current-line cards.");
  expectEqual(manifest.release_lines.current, CURRENT_LINE, "meta/manifest.json: current release line mismatch.");
  expectEqual(manifest.roots.canonical_cards_http, CARD_HTTP_ROOT, "meta/manifest.json: canonical_cards_http root mismatch.");
  expectEqual(manifest.updated_at, "2026-03-19T00:00:00Z", "meta/manifest.json: updated_at must reflect the current release stamp.");

  const commonsCount = cardRecords.filter(({ tier }) => tier === "commons").length;
  const commercialCount = cardRecords.filter(({ tier }) => tier === "commercial").length;
  expectEqual(manifest.bindings.commons.count, commonsCount, "meta/manifest.json: commons binding count mismatch.");
  expectEqual(manifest.bindings.commercial.count, commercialCount, "meta/manifest.json: commercial binding count mismatch.");

  console.log("✅ Manifest aligned with current-line card files: meta/manifest.json");
}

function validateCurrentLine(modeLabel) {
  console.log("▶ Validating current canonical release line (v1.1.0).");
  validateDescriptor(".well-known/agent.json");
  validateDescriptor(".well-known/agent-cards-v1.1.0.json");
  validateExpectedV11Set();
  const cardRecords = [];
  for (const file of collectJsonFiles("agents")) {
    const record = validateCard(file);
    if (record?.relativePath.startsWith(`agents/${CURRENT_LINE}/`)) cardRecords.push(record);
  }
  validateManifestAgainstCards(cardRecords);
  if (process.exitCode) process.exit(process.exitCode);
  console.log(`✅ ${modeLabel} validation completed successfully.`);
}

function validateLegacyLine() {
  console.log("▶ Validating legacy archival compatibility line (v1.0.0).");
  for (const file of collectJsonFiles(path.join("agents", "v1.0.0"))) {
    validateCard(file);
  }
  if (process.exitCode) process.exit(process.exitCode);
  console.log("✅ Legacy validation completed successfully.");
}

function main() {
  const mode = getMode();
  if (mode === "current") return validateCurrentLine("Current");
  if (mode === "legacy") return validateLegacyLine();
  validateCurrentLine("Release");
}

function validateLegacyLine() {
  console.log("▶ Validating legacy compatibility line (v1.0.0).");
  const legacyCards = collectJsonFiles("agents/v1.0.0");
  for (const file of legacyCards) validateCard(file);
  if (process.exitCode) process.exit(process.exitCode);
  console.log("✅ Legacy validation completed successfully.");
}

const mode = getMode();

function main() {
  if (mode === "legacy") {
    validateLegacyLine();
    return;
  }
  validateCurrentLine();
}

main();

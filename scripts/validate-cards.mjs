import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CURRENT_LINE = "v1.1.0";
const LEGACY_LINE = "v1.0.0";
const COMMONS = ["analyze", "classify", "clean", "convert", "describe", "explain", "fetch", "format", "parse", "summarize"];
const COMMERCIAL = ["authorize", "checkout", "purchase", "ship", "verify"];
const EXPECTED = [
  ...COMMONS.map((verb) => ({ tier: "commons", verb })),
  ...COMMERCIAL.map((verb) => ({ tier: "commercial", verb }))
].sort((a, b) => `${a.tier}/${a.verb}`.localeCompare(`${b.tier}/${b.verb}`));
const RELEASE_URLS = [
  "https://commandlayer.org/agent-cards/meta/manifest.json",
  "https://commandlayer.org/agent-cards/.well-known/agent.json",
  "https://commandlayer.org/agent-cards/.well-known/agent-cards-v1.1.0.json"
];

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

function loadJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}
function readJson(fullPath) {
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}
function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}
function collectJson(relativeRoot) {
  const start = path.join(ROOT, relativeRoot);
  const out = [];
  if (!fs.existsSync(start)) return out;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
    }
  }
  walk(start);
  return out.sort();
}
function fail(message, details) {
  console.error(`❌ ${message}`);
  if (details) console.error(details);
  process.exitCode = 1;
}
function ok(message) { console.log(`✅ ${message}`); }

const descriptorValidate = ajv.compile(loadJson("schemas/v1.1.0/agent.descriptor.schema.json"));
const legacyValidate = ajv.compile(loadJson("schemas/v1.0.0/_shared/agent.card.base.schema.json"));
const currentValidate = ajv.compile(loadJson("schemas/v1.1.0/agent.card.schema.json"));

function validateCurrentDescriptors() {
  const pointer = loadJson(".well-known/agent.json");
  const snapshot = loadJson(".well-known/agent-cards-v1.1.0.json");
  if (!descriptorValidate(pointer)) fail(".well-known/agent.json failed descriptor validation.", descriptorValidate.errors);
  if (!descriptorValidate(snapshot)) fail(".well-known/agent-cards-v1.1.0.json failed descriptor validation.", descriptorValidate.errors);
  if (pointer.meta.role !== "current-pointer") fail(".well-known/agent.json must declare role current-pointer.");
  if (snapshot.meta.role !== "frozen-snapshot") fail(".well-known/agent-cards-v1.1.0.json must declare role frozen-snapshot.");
  if (pointer.registry.snapshot?.http !== "https://commandlayer.org/agent-cards/.well-known/agent-cards-v1.1.0.json") fail(".well-known/agent.json must point to the frozen snapshot.");
  if (snapshot.id !== "x402://commandlayer.eth/agent-cards/v1.1.0") fail(".well-known/agent-cards-v1.1.0.json must be version-addressed.");
  ok("Discovery pointer and frozen snapshot are valid.");
}

function validateCurrentCardsAndManifest() {
  const manifest = loadJson("meta/manifest.json");
  const cards = collectJson("agents/v1.1.0");
  const expectedPaths = EXPECTED.map(({ tier, verb }) => `agents/v1.1.0/${tier}/${verb}agent.eth.json`);
  const actualPaths = cards.map((fullPath) => path.relative(ROOT, fullPath).replace(/\\/g, "/"));
  if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) fail("Current card set does not match the authoritative v1.1.0 inventory.", { expectedPaths, actualPaths });
  if (manifest.release_lines.current !== CURRENT_LINE) fail("Manifest current line must be v1.1.0.");
  if (manifest.authority?.dist_pin !== "derivative-release-bundle") fail("Manifest must classify dist-pin as derivative-release-bundle.");
  if (manifest.checksums?.current !== "https://commandlayer.org/agent-cards/checksums-v1.1.0.txt") fail("Manifest must point at checksums-v1.1.0.txt.");
  if (manifest.entries.length !== EXPECTED.length) fail("Manifest entry count does not match current cards.");

  const manifestById = new Map(manifest.entries.map((entry) => [entry.id, entry]));
  for (const fullPath of cards) {
    const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
    const [, , tier, fileName] = relativePath.split("/");
    const card = readJson(fullPath);
    if (!currentValidate(card)) {
      fail(`Current card failed schema validation: ${relativePath}`, currentValidate.errors);
      continue;
    }
    const verb = card.implements[0];
    const expectedId = `https://commandlayer.org/agent-cards/${relativePath}`;
    if (card.$id !== expectedId) fail(`${relativePath}: $id mismatch.`);
    if (card.id !== card.ens) fail(`${relativePath}: id must equal ens.`);
    if (fileName !== `${card.ens}.json`) fail(`${relativePath}: filename mismatch.`);
    if (card.class !== tier) fail(`${relativePath}: class mismatch.`);
    if (card.entry !== `x402://${card.ens}/${verb}/v${card.version}`) fail(`${relativePath}: entry mismatch.`);
    const rawRoot = tier === "commons" ? "protocol-commons" : "protocol-commercial";
    const rawPattern = new RegExp(`^https://raw\\.githubusercontent\\.com/commandlayer/${rawRoot}/refs/tags/v1\\.1\\.0/schemas/v1\\.1\\.0/${tier}/([^/]+)/\\1\\.(request|receipt)\\.schema\\.json$`);
    const mirrorPattern = new RegExp(`^https://commandlayer\\.org/schemas/v1\\.1\\.0/${tier}/([^/]+)/\\1\\.(request|receipt)\\.schema\\.json$`);
    if (!rawPattern.test(card.schemas.request) || !rawPattern.test(card.schemas.receipt)) fail(`${relativePath}: source schema URLs are invalid.`);
    if (!mirrorPattern.test(card.schemas_mirror.request) || !mirrorPattern.test(card.schemas_mirror.receipt)) fail(`${relativePath}: mirror schema URLs are invalid.`);

    const entry = manifestById.get(card.id);
    if (!entry) {
      fail(`${relativePath}: missing manifest entry.`);
      continue;
    }
    const expectedEntry = {
      id: card.id,
      class: card.class,
      verb,
      version: card.version,
      agent_card: `https://commandlayer.org/agent-cards/${relativePath}`,
      schema_request: card.schemas.request,
      schema_receipt: card.schemas.receipt,
      schema_request_mirror: card.schemas_mirror.request,
      schema_receipt_mirror: card.schemas_mirror.receipt,
      entry: card.entry,
      status: card.status,
      updated_at: card.updated_at
    };
    for (const [key, value] of Object.entries(expectedEntry)) {
      if (entry[key] !== value) fail(`${relativePath}: manifest field ${key} drifted.`);
    }
  }
  for (const entry of manifest.entries) {
    const expectedPath = `agents/v1.1.0/${entry.class}/${entry.verb}agent.eth.json`;
    if (!actualPaths.includes(expectedPath)) fail(`Manifest contains extra entry ${entry.id}.`);
  }
  ok("Current cards and manifest are aligned.");
}

function validateDistPin() {
  const pairs = [
    [".well-known/agent.json", "dist-pin/agent-cards/v1.1.0/.well-known/agent.json"],
    [".well-known/agent-cards-v1.1.0.json", "dist-pin/agent-cards/v1.1.0/.well-known/agent-cards-v1.1.0.json"],
    ["meta/manifest.json", "dist-pin/agent-cards/v1.1.0/meta/manifest.json"],
    ["meta/commons-agent.json", "dist-pin/agent-cards/v1.1.0/meta/commons-agent.json"],
    ["meta/commercial-agent.json", "dist-pin/agent-cards/v1.1.0/meta/commercial-agent.json"],
    ["schemas/v1.1.0/agent.card.schema.json", "dist-pin/agent-cards/v1.1.0/schemas/v1.1.0/agent.card.schema.json"],
    ["schemas/v1.1.0/agent.descriptor.schema.json", "dist-pin/agent-cards/v1.1.0/schemas/v1.1.0/agent.descriptor.schema.json"],
    ["checksums-v1.1.0.txt", "dist-pin/agent-cards/v1.1.0/checksums-v1.1.0.txt"]
  ];
  for (const { tier, verb } of EXPECTED) {
    pairs.push([
      `agents/v1.1.0/${tier}/${verb}agent.eth.json`,
      `dist-pin/agent-cards/v1.1.0/agents/v1.1.0/${tier}/${verb}agent.eth.json`
    ]);
  }
  for (const [source, target] of pairs) {
    if (!fs.existsSync(path.join(ROOT, target))) fail(`Missing dist-pin artifact: ${target}`);
    else if (readText(source) !== readText(target)) fail(`dist-pin drift detected: ${target}`);
  }
  ok("dist-pin v1.1.0 matches canonical root artifacts.");
}

function validateLegacy() {
  for (const fullPath of collectJson("agents/v1.0.0")) {
    const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
    const card = readJson(fullPath);
    if (!legacyValidate(card)) fail(`Legacy card failed schema validation: ${relativePath}`, legacyValidate.errors);
    const mirrors = card.schemas_mirror || {};
    for (const value of Object.values(mirrors)) {
      if (String(value).includes("COMMERCIAL_SCHEMAS_CID")) fail(`${relativePath}: placeholder mirror URL remains.`);
    }
    if (JSON.stringify(card).includes("pgp_fingerprint")) fail(`${relativePath}: obsolete pgp_fingerprint remains.`);
  }
  ok("Legacy v1.0.0 cards are explicitly archival and free of placeholders.");
}

async function checkUrl(target) {
  const response = await fetch(target, { method: "GET", redirect: "follow" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

async function validateRelease() {
  const manifest = loadJson("meta/manifest.json");
  const urls = new Set(RELEASE_URLS);
  for (const entry of manifest.entries) {
    [entry.agent_card, entry.schema_request, entry.schema_receipt, entry.schema_request_mirror, entry.schema_receipt_mirror].forEach((value) => urls.add(value));
  }
  for (const target of urls) {
    try {
      await checkUrl(target);
      ok(`Resolved ${target}`);
    } catch (error) {
      fail(`Release URL check failed for ${target}.`, error.message);
    }
  }
  for (const entry of manifest.entries) {
    if (!/^x402:\/\/[a-z0-9-]+\.eth\/[a-z][a-z0-9-]*\/v1\.1\.0$/.test(entry.entry)) fail(`Release entry URI invalid: ${entry.entry}`);
  }
  if (!process.exitCode) ok("Release-time external bindings are reachable and well-formed.");
}

const mode = process.argv.includes("--legacy") ? "legacy" : process.argv.includes("--release") ? "release" : "current";

if (mode === "current") {
  validateCurrentDescriptors();
  validateCurrentCardsAndManifest();
  validateDistPin();
}
if (mode === "legacy") validateLegacy();
if (mode === "release") await validateRelease();
if (process.exitCode) process.exit(process.exitCode);

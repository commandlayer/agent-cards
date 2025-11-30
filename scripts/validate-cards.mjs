import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ajv = new Ajv2020({
  strict: true,
  allErrors: true,
  strictTypes: true,
  strictTuples: true
});
addFormats(ajv);

function loadJson(relativePath) {
  const fullPath = path.join(__dirname, "..", relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function listJsonFiles(relativeDir) {
  const dir = path.join(__dirname, "..", relativeDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join(relativeDir, f));
}

// 1) Validate .well-known descriptor
function validateAgentDescriptor() {
  const schema = loadJson("schemas/v1.0.0/_shared/agent.descriptor.schema.json");
  const validate = ajv.compile(schema);

  // Updated to match your repo layout
  const descriptor = loadJson(".well-known/agent-cards-v1.0.0.json");

  const ok = validate(descriptor);
  if (!ok) {
    console.error("❌ .well-known/agent-cards-v1.0.0.json failed validation:");
    console.error(validate.errors);
    process.exitCode = 1;
  } else {
    console.log("✅ .well-known/agent-cards-v1.0.0.json is valid.");
  }
}

// 2) Validate all Agent Cards (commons + commercial) against base schema
function validateAgentCards() {
  // Base schema for cards – adjust path if you keep it somewhere else
  const baseSchema = loadJson(
    "schemas/v1.0.0/commons/agent.card.base.schema.json"
  );
  const validate = ajv.compile(baseSchema);

  const cardDirs = [
    "agents/v1.0.0/commons",
    "agents/v1.0.0/commercial"
  ];

  for (const dir of cardDirs) {
    const files = listJsonFiles(dir);

    for (const relPath of files) {
      const card = loadJson(relPath);
      const ok = validate(card);

      if (!ok) {
        console.error(`❌ Agent Card failed validation: ${relPath}`);
        console.error(validate.errors);
        process.exitCode = 1;
      } else {
        console.log(`✅ Agent Card valid: ${relPath}`);
      }
    }
  }
}

function main() {
  validateAgentDescriptor();
  validateAgentCards();

  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  } else {
    console.log("✅ All Agent Card validations completed successfully.");
  }
}

main();

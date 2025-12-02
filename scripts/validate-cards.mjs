import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ajv = new Ajv2020({
  strict: true,
  allErrors: true
});

addFormats(ajv);

function loadJson(relativePath) {
  const fullPath = path.join(__dirname, "..", relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

// Validate .well-known/agent.json against descriptor schema
function validateAgentDescriptor() {
  const schema = loadJson("schemas/v1.0.0/_shared/agent.descriptor.schema.json");
  const validate = ajv.compile(schema);

  const descriptor = loadJson(".well-known/agent.json");
  const ok = validate(descriptor);

  if (!ok) {
    console.error("❌ .well-known/agent.json failed validation:");
    console.error(validate.errors);
    process.exitCode = 1;
  } else {
    console.log("✅ .well-known/agent.json is valid.");
  }
}

// Recursively collect all Agent Card JSON files
function getAllAgentCardFiles(rootDir) {
  const results = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && full.endsWith(".json")) {
        results.push(full);
      }
    }
  }

  walk(rootDir);
  return results;
}

// Validate all Agent Cards against the base schema
function validateAgentCards() {
  const baseSchema = loadJson("schemas/v1.0.0/_shared/agent.card.base.schema.json");
  const validate = ajv.compile(baseSchema);

  const root = path.join(__dirname, "..", "agents", "v1.0.0");
  const cardFiles = getAllAgentCardFiles(root);

  for (const cardPath of cardFiles) {
    const relPath = path.relative(path.join(__dirname, ".."), cardPath);
    const card = JSON.parse(fs.readFileSync(cardPath, "utf8"));

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

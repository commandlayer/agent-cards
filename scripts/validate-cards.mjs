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

// 1) Validate .well-known/agent.json
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

// 2) Validate AgentCard examples for all Commons verbs
function validateAgentCards() {
  const verbs = [
    "summarize",
    "analyze",
    "fetch",
    "classify",
    "clean",
    "convert",
    "describe",
    "explain",
    "format",
    "parse"
  ];

  for (const verb of verbs) {
    const schemaPath = `schemas/v1.0.0/commons/${verb}.agent.card.schema.json`;
    const examplePath = `examples/v1.0.0/commons/${verb}.agent.card.example.json`;

    const schema = loadJson(schemaPath);
    const validate = ajv.compile(schema);
    const example = loadJson(examplePath);

    const ok = validate(example);
    if (!ok) {
      console.error(`❌ AgentCard example failed for verb: ${verb}`);
      console.error(`   Example: ${examplePath}`);
      console.error(validate.errors);
      process.exitCode = 1;
    } else {
      console.log(`✅ AgentCard example OK for verb: ${verb}`);
    }
  }
}

function main() {
  validateAgentDescriptor();
  validateAgentCards();

  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  } else {
    console.log("✅ All AgentCard validations completed successfully.");
  }
}

main();

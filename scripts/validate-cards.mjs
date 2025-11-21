#!/usr/bin/env node
/**
 * AgentCards validator (Apache-2.0)
 * Validates all commons AgentCard schemas against their example instances.
 */

import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const SCHEMAS_ROOT = "schemas/v1.0.0/commons";
const EXAMPLES_ROOT = "examples/v1.0.0/commons";

const ajv = new Ajv({
  strict: true,
  allErrors: true
});

addFormats(ajv);

function walk(dir) {
  const entries = readdirSync(dir);
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function main() {
  const schemaFiles = walk(SCHEMAS_ROOT).filter((f) =>
    f.endsWith(".agent.card.schema.json")
  );

  if (schemaFiles.length === 0) {
    console.warn("⚠️ No AgentCard schemas found under", SCHEMAS_ROOT);
    process.exit(0);
  }

  let hadError = false;

  for (const schemaPath of schemaFiles) {
    const raw = readFileSync(schemaPath, "utf8");
    const schema = JSON.parse(raw);

    const validate = ajv.compile(schema);

    const base = basename(schemaPath, ".agent.card.schema.json");
    const examplePath = join(EXAMPLES_ROOT, `${base}.example.json`);

    let example;
    try {
      const exRaw = readFileSync(examplePath, "utf8");
      example = JSON.parse(exRaw);
    } catch (_err) {
      console.error(`❌ Missing or unreadable example for schema: ${schemaPath}`);
      console.error(`   Expected example at: ${examplePath}`);
      hadError = true;
      continue;
    }

    const ok = validate(example);
    if (!ok) {
      console.error(`❌ Example failed validation for schema: ${schemaPath}`);
      console.error(`   Example: ${examplePath}`);
      console.error(validate.errors);
      hadError = true;
    } else {
      console.log(`✅ Example OK: ${schemaPath} -> ${examplePath}`);
    }
  }

  if (hadError) {
    process.exitCode = 1;
  } else {
    console.log("✅ All AgentCard schemas validated successfully.");
  }
}

main();

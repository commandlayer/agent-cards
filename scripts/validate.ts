// scripts/validate.ts
//
// CI validation for Agent Cards:
// - Validates every card JSON against agent.card.base.schema.json
// - Checks checksums/* .sha256 files match card contents (if present)

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Glob } from "glob";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

const repoRoot = path.resolve(__dirname, "..");

type Mode = "all" | "agents" | "checksums";

// --- CLI mode parsing -------------------------------------------------------

function getModeFromArgs(): Mode {
  const arg = process.argv.find(a => a.startsWith("--mode="));
  if (!arg) return "all";
  const value = arg.split("=")[1];
  if (value === "agents" || value === "checksums") return value;
  return "all";
}

// --- Ajv setup --------------------------------------------------------------

const ajv = new Ajv({
  strict: true,
  strictTypes: true,
  allErrors: true
});
addFormats(ajv);

// Base schema path (you can adjust if you move it)
const baseSchemaPath = path.join(
  repoRoot,
  "schemas",
  "v1.0.0",
  "commons",
  "agent.card.base.schema.json"
);

function loadBaseSchema() {
  if (!fs.existsSync(baseSchemaPath)) {
    throw new Error(`Base schema not found at: ${baseSchemaPath}`);
  }
  const raw = fs.readFileSync(baseSchemaPath, "utf8");
  const json = JSON.parse(raw);
  ajv.addSchema(json, json.$id || "agent-card-base");
  return json.$id || "agent-card-base";
}

// --- Validation helpers -----------------------------------------------------

async function validateAgentCards() {
  console.log("▶ Validating Agent Cards...");

  const baseId = loadBaseSchema();
  const validate = ajv.getSchema(baseId);
  if (!validate) {
    throw new Error("Ajv could not resolve base schema validator");
  }

  const glob = new Glob("agents/v1.0.0/**/*.json", {
    cwd: repoRoot,
    absolute: true
  });

  let count = 0;
  const errors: string[] = [];

  for await (const file of glob) {
    const rel = path.relative(repoRoot, file);
    const raw = fs.readFileSync(file, "utf8");
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      errors.push(`❌ ${rel}: invalid JSON: ${(err as Error).message}`);
      continue;
    }

    const ok = validate(json);
    if (!ok) {
      const details = (validate.errors || [])
        .map(e => `  - ${e.instancePath || "/"} ${e.message}`)
        .join("\n");
      errors.push(`❌ ${rel}: schema validation failed\n${details}`);
    } else {
      console.log(`✅ ${rel}`);
    }

    count++;
  }

  if (count === 0) {
    console.warn("⚠ No agent cards found under agents/v1.0.0/");
  }

  if (errors.length) {
    console.error("\nValidation errors:");
    console.error(errors.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("\n✔ All Agent Cards passed schema validation.");
  }
}

// checksum file format: plain "sha256:<hex>" or just "<hex>"
function normalizeChecksum(line: string): string {
  const trimmed = line.trim();
  if (trimmed.startsWith("sha256:")) return trimmed.slice("sha256:".length);
  return trimmed;
}

function sha256File(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(buf);
  return hash.digest("hex");
}

async function validateChecksums() {
  console.log("▶ Validating checksums...");

  const glob = new Glob("checksums/**/*.sha256", {
    cwd: repoRoot,
    absolute: true
  });

  let count = 0;
  const errors: string[] = [];

  for await (const checksumFile of glob) {
    const relChecksum = path.relative(repoRoot, checksumFile);
    const contents = fs.readFileSync(checksumFile, "utf8").trim();
    if (!contents) {
      errors.push(`❌ ${relChecksum}: empty checksum file`);
      continue;
    }

    const expected = normalizeChecksum(contents);

    // Derive JSON path from checksum path:
    // checksums/commons/summarizeagent.eth.sha256
    //   → agents/v1.0.0/commons/summarizeagent.eth.json
    const baseName = path.basename(checksumFile, ".sha256");
    const parentDir = path.basename(path.dirname(checksumFile)); // commons / commercial
    const jsonPath = path.join(
      repoRoot,
      "agents",
      "v1.0.0",
      parentDir,
      `${baseName}.json`
    );

    if (!fs.existsSync(jsonPath)) {
      errors.push(
        `❌ ${relChecksum}: matching agent JSON not found at ${path.relative(
          repoRoot,
          jsonPath
        )}`
      );
      continue;
    }

    const actual = sha256File(jsonPath);
    if (actual !== expected) {
      errors.push(
        `❌ ${relChecksum}: checksum mismatch\n  expected: ${expected}\n  actual:   ${actual}`
      );
    } else {
      console.log(`✅ ${relChecksum} ↔ ${path.relative(repoRoot, jsonPath)}`);
    }

    count++;
  }

  if (count === 0) {
    console.warn("⚠ No checksum files found under checksums/");
  }

  if (errors.length) {
    console.error("\nChecksum errors:");
    console.error(errors.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("\n✔ All checksums match their Agent Cards.");
  }
}

// --- main -------------------------------------------------------------------

async function main() {
  const mode = getModeFromArgs();

  if (mode === "agents" || mode === "all") {
    await validateAgentCards();
  }

  if (mode === "checksums" || mode === "all") {
    await validateChecksums();
  }

  // If process.exitCode was set to 1, CI will fail automatically
}

main().catch(err => {
  console.error("Fatal error in validation:", err);
  process.exit(1);
});

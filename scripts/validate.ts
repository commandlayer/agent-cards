// scripts/validate.ts
//
// CI validation for Agent Cards:
// - Validates every card JSON against the base agent-card schema
// - Optionally validates per-file checksums if checksums/**/*.sha256 exists

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

import { Glob } from "glob";
import type { ErrorObject } from "ajv";

// ESM-safe repo root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

// CJS require inside ESM TS (fixes Ajv/addFormats typing on TS+ESM)
const require = createRequire(import.meta.url);
const Ajv = require("ajv") as typeof import("ajv");
const addFormats = require("ajv-formats") as (ajv: any) => void;

type Mode = "all" | "agents" | "checksums";

function getModeFromArgs(): Mode {
  const arg = process.argv.find((a) => a.startsWith("--mode="));
  if (!arg) return "all";
  const value = arg.split("=")[1];
  if (value === "agents" || value === "checksums") return value;
  return "all";
}

// Ajv setup
const ajv = new Ajv.default({
  strict: true,
  strictTypes: true,
  allErrors: true
});
addFormats(ajv);

// Base schema path
const baseSchemaPath = path.join(
  repoRoot,
  "schemas",
  "v1.0.0",
  "_shared",
  "agent.card.base.schema.json"
);

function loadBaseSchema(): string {
  if (!fs.existsSync(baseSchemaPath)) {
    throw new Error(`Base schema not found at: ${baseSchemaPath}`);
  }
  const raw = fs.readFileSync(baseSchemaPath, "utf8");
  const json = JSON.parse(raw);

  const id: string = json.$id || "agent-card-base";
  ajv.addSchema(json, id);
  return id;
}

async function validateAgentCards() {
  console.log("▶ Validating Agent Cards...");

  const baseId = loadBaseSchema();
  const validate = ajv.getSchema(baseId);
  if (!validate) throw new Error("Ajv could not resolve base schema validator");

  const glob = new Glob("agents/v1.0.0/**/*.json", {
    cwd: repoRoot,
    absolute: true
  });

  let count = 0;
  const errors: string[] = [];

  for await (const file of glob) {
    const rel = path.relative(repoRoot, file).replace(/\\/g, "/");
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
        .map((e: ErrorObject) => `  - ${e.instancePath || "/"} ${e.message}`)
        .join("\n");
      errors.push(`❌ ${rel}: schema validation failed\n${details}`);
    } else {
      console.log(`✅ ${rel}`);
    }

    count++;
  }

  if (count === 0) console.warn("⚠ No agent cards found under agents/v1.0.0/");

  if (errors.length) {
    console.error("\nValidation errors:");
    console.error(errors.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("\n✔ All Agent Cards passed schema validation.");
  }
}

function normalizeChecksum(line: string): string {
  const trimmed = line.trim();
  return trimmed.startsWith("sha256:") ? trimmed.slice("sha256:".length) : trimmed;
}

function sha256File(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function hasPerFileChecksums(): boolean {
  const checksumsDir = path.join(repoRoot, "checksums");
  if (!fs.existsSync(checksumsDir)) return false;

  const stack = [checksumsDir];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (full.endsWith(".sha256")) return true;
    }
  }
  return false;
}

async function validateChecksums() {
  console.log("▶ Validating per-file checksums...");

  const glob = new Glob("checksums/**/*.sha256", {
    cwd: repoRoot,
    absolute: true
  });

  let count = 0;
  const errors: string[] = [];

  for await (const checksumFile of glob) {
    const relChecksum = path.relative(repoRoot, checksumFile).replace(/\\/g, "/");
    const contents = fs.readFileSync(checksumFile, "utf8").trim();

    if (!contents) {
      errors.push(`❌ ${relChecksum}: empty checksum file`);
      continue;
    }

    const expected = normalizeChecksum(contents);

    const baseName = path.basename(checksumFile, ".sha256");
    const parentDir = path.basename(path.dirname(checksumFile)); // commons / commercial

    const jsonPath = path.join(
      repoRoot,
      "agents",
      "v1.0.0",
      parentDir,
      `${baseName}.json`
    );

    const relJson = path.relative(repoRoot, jsonPath).replace(/\\/g, "/");

    if (!fs.existsSync(jsonPath)) {
      errors.push(`❌ ${relChecksum}: matching agent JSON not found at ${relJson}`);
      continue;
    }

    const actual = sha256File(jsonPath);
    if (actual !== expected) {
      errors.push(
        `❌ ${relChecksum}: checksum mismatch\n  expected: ${expected}\n  actual:   ${actual}`
      );
    } else {
      console.log(`✅ ${relChecksum} ↔ ${relJson}`);
    }

    count++;
  }

  if (count === 0) console.warn("⚠ No checksum files found under checksums/**/*.sha256");

  if (errors.length) {
    console.error("\nChecksum errors:");
    console.error(errors.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("\n✔ All per-file checksums match their Agent Cards.");
  }
}

async function main() {
  const mode = getModeFromArgs();

  if (mode === "agents" || mode === "all") {
    await validateAgentCards();
  }

  if ((mode === "checksums" || mode === "all") && hasPerFileChecksums()) {
    await validateChecksums();
  }
}

main().catch((err) => {
  console.error("Fatal error in validation:", err);
  process.exit(1);
});

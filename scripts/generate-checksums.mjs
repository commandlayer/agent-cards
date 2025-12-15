// scripts/generate-checksums.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

const OUT_FILE = "checksums.txt";

// Canonical roots to hash (only include ones that exist)
const ROOTS = ["agents", "meta", ".well-known", "schemas", "examples"];

// Always exclude these paths/files
const EXCLUDE_PATH_SUBSTRINGS = [
  "/node_modules/",
  "/.git/",
];
const EXCLUDE_FILES = new Set([
  OUT_FILE,
]);

function existsDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function shouldInclude(relPosix) {
  if (EXCLUDE_FILES.has(relPosix)) return false;
  for (const s of EXCLUDE_PATH_SUBSTRINGS) {
    if (relPosix.includes(s)) return false;
  }
  return true;
}

function listFilesUnder(relativeRoot) {
  const result = [];
  const rootPath = path.join(ROOT_DIR, relativeRoot);
  if (!existsDir(rootPath)) return result;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(currentPath, entry.name);
      const rel = path.relative(ROOT_DIR, full).replace(/\\/g, "/"); // POSIX

      if (entry.isDirectory()) walk(full);
      else if (shouldInclude(rel)) result.push(rel);
    }
  }

  walk(rootPath);
  return result;
}

function sha256File(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const buf = fs.readFileSync(fullPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function buildChecksums() {
  let files = [];
  for (const root of ROOTS) files = files.concat(listFilesUnder(root));
  files.sort(); // deterministic

  const lines = files.map((relPath) => `${sha256File(relPath)}  ${relPath}`);
  return lines.join("\n") + "\n";
}

function readExistingChecksums() {
  const p = path.join(ROOT_DIR, OUT_FILE);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
}

function main() {
  const args = new Set(process.argv.slice(2));
  const verify = args.has("--verify");

  const generated = buildChecksums();
  const outputPath = path.join(ROOT_DIR, OUT_FILE);

  if (verify) {
    const existing = readExistingChecksums();
    if (existing === null) {
      console.error(`❌ ${OUT_FILE} not found. Run without --verify to generate it.`);
      process.exit(1);
    }
    if (existing !== generated) {
      console.error(`❌ ${OUT_FILE} is out of date.`);
      console.error(`   Run: npm run generate:checksums`);
      process.exit(1);
    }
    console.log(`✅ ${OUT_FILE} matches the current repo contents.`);
    return;
  }

  fs.writeFileSync(outputPath, generated, "utf8");
  const lineCount = generated.trimEnd().split("\n").length;
  console.log(`✅ ${OUT_FILE} written with ${lineCount} entries.`);
}

main();

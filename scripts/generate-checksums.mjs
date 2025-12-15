import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

const ROOTS = ["agents", "meta", ".well-known", "schemas"];
const EXCLUDE_FILES = new Set(["checksums.txt"]);

function existsDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function listFilesUnder(relativeRoot) {
  const result = [];
  const rootPath = path.join(ROOT_DIR, relativeRoot);
  if (!existsDir(rootPath)) return result;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(currentPath, entry.name);
      const rel = path.relative(ROOT_DIR, full).replace(/\\/g, "/");
      if (entry.isDirectory()) walk(full);
      else if (!EXCLUDE_FILES.has(rel)) result.push(rel);
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

function buildChecksumsText() {
  let files = [];
  for (const root of ROOTS) files = files.concat(listFilesUnder(root));
  files.sort();
  const lines = files.map((relPath) => `${sha256File(relPath)}  ${relPath}`);
  return { text: lines.join("\n") + "\n", count: files.length };
}

function main() {
  const verify = process.argv.includes("--verify");
  const outputPath = path.join(ROOT_DIR, "checksums.txt");

  const { text, count } = buildChecksumsText();

  if (verify) {
    const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
    if (existing !== text) {
      console.error("❌ checksums.txt does NOT match current repo contents.");
      process.exit(1);
    }
    console.log("✅ checksums.txt matches the current repo contents.");
    return;
  }

  fs.writeFileSync(outputPath, text, "utf8");
  console.log(`✅ checksums.txt written with ${count} entries.`);
}

main();

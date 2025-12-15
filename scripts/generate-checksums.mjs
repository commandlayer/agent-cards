import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

const ROOTS = ["agents", "meta", ".well-known", "schemas"];

// Ignore platform / tooling junk + the checksum itself
const EXCLUDE_PREFIXES = ["node_modules/", ".git/"];
const EXCLUDE_BASENAMES = new Set([
  "checksums.txt",
  ".DS_Store",
  "Thumbs.db",
]);

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function sha256File(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const buf = fs.readFileSync(fullPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function listFilesUnder(relativeRoot) {
  const out = [];
  const rootPath = path.join(ROOT_DIR, relativeRoot);
  if (!isDir(rootPath)) return out;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(currentPath, entry.name);
      const rel = path.relative(ROOT_DIR, full).replace(/\\/g, "/");

      // directory traversal
      if (entry.isDirectory()) {
        // skip excluded directories early
        if (EXCLUDE_PREFIXES.some((p) => rel.startsWith(p))) continue;
        walk(full);
        continue;
      }

      // file filters
      if (EXCLUDE_PREFIXES.some((p) => rel.startsWith(p))) continue;
      if (EXCLUDE_BASENAMES.has(path.basename(rel))) continue;

      out.push(rel);
    }
  }

  walk(rootPath);
  return out;
}

function buildChecksumsText() {
  let files = [];
  for (const root of ROOTS) files = files.concat(listFilesUnder(root));

  // stable sort, independent of locale
  files.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

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

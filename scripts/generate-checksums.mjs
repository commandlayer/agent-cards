import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

const ROOTS = [
<<<<<<< HEAD
 "agents",
=======
  "agents",
>>>>>>> dd71167 (release: bind agent-cards v1.0.0 to CID bafybeihwxb...)
  "meta",
  ".well-known",
  "schemas"
];

const EXCLUDE_FILES = new Set([
  "checksums.txt"
]);

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

function main() {
  let files = [];
  for (const root of ROOTS) files = files.concat(listFilesUnder(root));

  files.sort();

  const lines = files.map((relPath) => `${sha256File(relPath)}  ${relPath}`);
  const outputPath = path.join(ROOT_DIR, "checksums.txt");

  fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");
  console.log(`✅ checksums.txt written with ${files.length} entries.`);
}

main();

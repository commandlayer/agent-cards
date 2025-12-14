import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

// Which paths to include in checksums
const ROOTS = [
 "agents",
  "meta",
  ".well-known",
  "schemas"
];

function listFiles(relativeRoot) {
  const result = [];
  const rootPath = path.join(ROOT_DIR, relativeRoot);

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(currentPath, entry.name);
      const rel = path.relative(ROOT_DIR, full).replace(/\\/g, "/");

      if (entry.isDirectory()) {
        walk(full);
      } else {
        result.push(rel);
      }
    }
  }

  if (fs.existsSync(rootPath)) {
    walk(rootPath);
  }

  return result;
}

function sha256File(relativePath) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  const buf = fs.readFileSync(fullPath);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  return hash;
}

function main() {
  let files = [];
  for (const root of ROOTS) {
    files = files.concat(listFiles(root));
  }

  files.sort();

  const lines = files.map((relPath) => {
    const hash = sha256File(relPath);
    return `${hash}  ${relPath}`;
  });

  const outputPath = path.join(ROOT_DIR, "checksums.txt");
  fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");

  console.log(`✅ checksums.txt written with ${files.length} entries.`);
}

main();

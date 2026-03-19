import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");

const EXCLUDE_PREFIXES = ["node_modules/", ".git/"];
const EXCLUDE_BASENAMES = new Set([".DS_Store", "Thumbs.db"]);

const SPECIFICATIONS = [
  {
    name: "current release checksums",
    output: "checksums-v1.1.0.txt",
    roots: [
      ".well-known/agent.json",
      ".well-known/agent-cards-v1.1.0.json",
      "agents/v1.1.0",
      "meta",
      "schemas/v1.1.0"
    ],
    excludeBasenames: new Set(["checksums-v1.1.0.txt", "checksums-v1.0.0.txt", "checksums.txt"])
  },
  {
    name: "archival compatibility checksums",
    output: "checksums-v1.0.0.txt",
    roots: ["agents/v1.0.0", "schemas/v1.0.0"],
    excludeBasenames: new Set(["checksums-v1.1.0.txt", "checksums-v1.0.0.txt", "checksums.txt"])
  },
  {
    name: "dist-pin v1.1.0 publish bundle checksums",
    output: "dist-pin/agent-cards/v1.1.0/checksums.txt",
    roots: ["dist-pin/agent-cards/v1.1.0/.well-known", "dist-pin/agent-cards/v1.1.0/agents", "dist-pin/agent-cards/v1.1.0/meta", "dist-pin/agent-cards/v1.1.0/schemas"],
    stripPrefix: "dist-pin/agent-cards/v1.1.0/",
    excludeBasenames: new Set(["checksums.txt"])
  },
  {
    name: "dist-pin v1.0.0 archival publish bundle checksums",
    output: "dist-pin/agent-cards/v1.0.0/checksums.txt",
    roots: ["dist-pin/agent-cards/v1.0.0/.well-known", "dist-pin/agent-cards/v1.0.0/meta", "dist-pin/agent-cards/v1.0.0/agents", "dist-pin/agent-cards/v1.0.0/schemas"],
    stripPrefix: "dist-pin/agent-cards/v1.0.0/",
    excludeBasenames: new Set(["checksums.txt"])
  }
];

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function sha256File(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const buf = fs.readFileSync(fullPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function shouldInclude(relPath, excludeBasenames) {
  if (EXCLUDE_PREFIXES.some((prefix) => relPath.startsWith(prefix))) return false;
  if (EXCLUDE_BASENAMES.has(path.basename(relPath))) return false;
  if (excludeBasenames.has(path.basename(relPath))) return false;
  return true;
}

function collectFiles(relPath, excludeBasenames) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (isFile(fullPath)) {
    return shouldInclude(relPath, excludeBasenames) ? [relPath] : [];
  }
  if (!isDir(fullPath)) return [];

  const out = [];
  function walk(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const full = path.join(currentPath, entry.name);
      const rel = path.relative(ROOT_DIR, full).replace(/\\/g, "/");
      if (entry.isDirectory()) {
        if (EXCLUDE_PREFIXES.some((prefix) => rel.startsWith(prefix))) continue;
        walk(full);
        continue;
      }
      if (shouldInclude(rel, excludeBasenames)) out.push(rel);
    }
  }

  walk(fullPath);
  return out;
}

function buildSpecificationText(spec) {
  const files = spec.roots
    .flatMap((root) => collectFiles(root, spec.excludeBasenames))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  const lines = files.map((relPath) => {
    const renderedPath = spec.stripPrefix ? relPath.slice(spec.stripPrefix.length) : relPath;
    return `${sha256File(relPath)}  ${renderedPath}`;
  });

  return { text: lines.join("\n") + "\n", count: files.length };
}

function verifySpecification(spec) {
  const outputPath = path.join(ROOT_DIR, spec.output);
  const { text } = buildSpecificationText(spec);
  const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";

  if (existing !== text) {
    console.error(`❌ ${spec.output} does NOT match ${spec.name}.`);
    process.exitCode = 1;
    return;
  }

  console.log(`✅ ${spec.output} matches ${spec.name}.`);
}

function writeSpecification(spec) {
  const outputPath = path.join(ROOT_DIR, spec.output);
  const { text, count } = buildSpecificationText(spec);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, text, "utf8");
  console.log(`✅ ${spec.output} written with ${count} entries for ${spec.name}.`);
}

function main() {
  const verify = process.argv.includes("--verify");
  for (const spec of SPECIFICATIONS) {
    if (verify) verifySpecification(spec);
    else writeSpecification(spec);
  }

  if (verify && process.exitCode) process.exit(process.exitCode);
}

main();

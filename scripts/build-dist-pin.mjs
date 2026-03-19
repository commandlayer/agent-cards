import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const VERSION = 'v1.1.0';
const OUTPUT_ROOT = process.env.DIST_PIN_OUTPUT_ROOT
  ? path.resolve(process.env.DIST_PIN_OUTPUT_ROOT)
  : path.join(ROOT, 'dist-pin', 'agent-cards', VERSION);
const INCLUDED_PATHS = [
  '.well-known/agent.json',
  '.well-known/agent-cards-v1.1.0.json',
  'meta/manifest.json',
  'meta/commons-agent.json',
  'meta/commercial-agent.json',
  'schemas/v1.1.0/agent.card.schema.json',
  'schemas/v1.1.0/agent.descriptor.schema.json',
  'agents/v1.1.0'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function removeDirContents(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function listFilesUnder(rootDir) {
  const out = [];
  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(path.relative(rootDir, full).replace(/\\/g, '/'));
    }
  }
  if (fs.existsSync(rootDir)) walk(rootDir);
  return out.sort();
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function writeBundleChecksums() {
  const files = listFilesUnder(OUTPUT_ROOT).filter((file) => file !== 'checksums.txt');
  const lines = files.map((file) => `${sha256(path.join(OUTPUT_ROOT, file))}  ${file}`);
  fs.writeFileSync(path.join(OUTPUT_ROOT, 'checksums.txt'), `${lines.join('\n')}\n`, 'utf8');
}

function main() {
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  removeDirContents(OUTPUT_ROOT);

  for (const relPath of INCLUDED_PATHS) {
    copyRecursive(path.join(ROOT, relPath), path.join(OUTPUT_ROOT, relPath));
  }

  writeBundleChecksums();
  const outputLabel = path.relative(ROOT, OUTPUT_ROOT).replace(/\\/g, '/');
  console.log(`✅ Rebuilt derivative publish bundle at ${outputLabel || OUTPUT_ROOT}`);
}

main();

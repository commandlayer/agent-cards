import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const VERSION = 'v1.1.0';
const RECHECK_SCHEMAS = process.argv.includes('--require-mirrors');
const TIMEOUT_MS = 15000;

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function loadJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`✅ ${message}`);
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function listFilesUnder(rootDir) {
  const out = [];
  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(full);
    }
  }
  if (fs.existsSync(rootDir)) walk(rootDir);
  return out.sort();
}

function validateManifestBindings() {
  const manifest = loadJson('meta/manifest.json');
  if (manifest.release_lines?.current !== VERSION) fail(`meta/manifest.json: release_lines.current must equal ${VERSION}.`);
  if (manifest.publication?.model !== 'root-canonical-plus-derivative-dist-pin') {
    fail('meta/manifest.json: publication.model must declare root-canonical-plus-derivative-dist-pin.');
  } else {
    ok('Manifest declares the canonical-root + derivative dist-pin publication model.');
  }

  const cards = listFilesUnder(path.join(ROOT, 'agents', VERSION)).map((file) => ({
    path: rel(file),
    card: JSON.parse(fs.readFileSync(file, 'utf8'))
  }));
  const entriesById = new Map(manifest.entries.map((entry) => [entry.id, entry]));

  for (const { path: cardPath, card } of cards) {
    const entry = entriesById.get(card.id);
    if (!entry) {
      fail(`${cardPath}: missing manifest entry for ${card.id}.`);
      continue;
    }
    const verb = card.implements[0];
    const expectedCardUrl = `https://commandlayer.org/agent-cards/${cardPath}`;
    if (entry.agent_card !== expectedCardUrl) fail(`${cardPath}: manifest agent_card mismatch for ${card.id}.`);
    if (entry.schema_request !== card.schemas.request) fail(`${cardPath}: manifest schema_request mismatch for ${card.id}.`);
    if (entry.schema_receipt !== card.schemas.receipt) fail(`${cardPath}: manifest schema_receipt mismatch for ${card.id}.`);
    if (entry.entry !== card.entry) fail(`${cardPath}: manifest entry mismatch for ${card.id}.`);
    if (entry.verb !== verb) fail(`${cardPath}: manifest verb mismatch for ${card.id}.`);
  }

  if (!process.exitCode) ok('Manifest entries match every canonical v1.1.0 card binding.');
}

function validateBundleReproducibility() {
  const actualRoot = path.join(ROOT, 'dist-pin', 'agent-cards', VERSION);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-cards-dist-pin-'));

  execFileSync('node', ['scripts/build-dist-pin.mjs'], {
    cwd: ROOT,
    env: { ...process.env, DIST_PIN_OUTPUT_ROOT: tempRoot },
    stdio: 'ignore'
  });

  const actualFiles = listFilesUnder(actualRoot).map((file) => rel(file));
  const rebuiltFiles = listFilesUnder(tempRoot).map((file) => path.relative(tempRoot, file).replace(/\\/g, '/'));

  if (JSON.stringify(actualFiles) !== JSON.stringify(rebuiltFiles.map((file) => `dist-pin/agent-cards/${VERSION}/${file}`))) {
    fail(`dist-pin/agent-cards/${VERSION}: file set does not match a freshly generated bundle from root canonical files.`);
    return;
  }

  for (const rebuiltRelative of rebuiltFiles) {
    const actualFile = path.join(actualRoot, rebuiltRelative);
    const rebuiltFile = path.join(tempRoot, rebuiltRelative);
    if (sha256(actualFile) !== sha256(rebuiltFile)) {
      fail(`dist-pin/agent-cards/${VERSION}/${rebuiltRelative}: bundle content diverges from generated output.`);
    }
  }

  ok(`dist-pin/agent-cards/${VERSION} matches a freshly generated derivative bundle from the canonical root files.`);
}

async function fetchStatus(targetUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let response = await fetch(targetUrl, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal
    });
    if (response.status === 405 || response.status === 501) {
      response = await fetch(targetUrl, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
        redirect: 'follow',
        signal: controller.signal
      });
    }
    return { ok: response.ok, status: response.status };
  } catch (error) {
    const detail = error instanceof Error
      ? [error.message, error.cause?.message].filter(Boolean).join(': ')
      : String(error);
    return { ok: false, error: detail };
  } finally {
    clearTimeout(timeout);
  }
}

async function validateExternalBindings() {
  const cards = listFilesUnder(path.join(ROOT, 'agents', VERSION));
  const targets = [];
  for (const file of cards) {
    const card = JSON.parse(fs.readFileSync(file, 'utf8'));
    targets.push({ card: rel(file), field: 'schemas.request', url: card.schemas.request, required: true });
    targets.push({ card: rel(file), field: 'schemas.receipt', url: card.schemas.receipt, required: true });
  }

  for (const target of targets) {
    const result = await fetchStatus(target.url);
    if (!result.ok) {
      const detail = result.status ? `HTTP ${result.status}` : result.error;
      fail(`${target.card}: ${target.field} failed external resolution for ${target.url} (${detail}).`);
    } else {
      ok(`${target.card}: ${target.field} resolved (${result.status})`);
    }
  }

  if (RECHECK_SCHEMAS && !process.exitCode) {
    ok('Canonical hosted schema recheck completed (`--require-mirrors` now revalidates commandlayer.org schema URLs).');
  }
}

async function main() {
  validateManifestBindings();
  validateBundleReproducibility();
  await validateExternalBindings();
  if (process.exitCode) process.exit(process.exitCode);
  ok('Release validation completed successfully.');
}

main().catch((error) => {
  console.error(`❌ Fatal release validation error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

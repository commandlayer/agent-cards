import fs from "fs";
import path from "path";

const AGENTS_DIR = path.join(process.cwd(), "agents");

// Canonical roots
const IPFS_ROOT = "ipfs://bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m";
const HTTP_ROOT = "https://commandlayer.org/schemas/v1.0.0";

for (const file of fs.readdirSync(AGENTS_DIR)) {
  if (!file.endsWith(".json")) continue;

  const fp = path.join(AGENTS_DIR, file);
  const raw = fs.readFileSync(fp, "utf8");
  const card = JSON.parse(raw);

  if (!card.schemas || !card.schemas.request || !card.schemas.receipt) {
    console.error(`Skipping ${file}: missing schemas.request or schemas.receipt`);
    continue;
  }

  const reqIpfs = card.schemas.request;
  const recIpfs = card.schemas.receipt;

  if (!reqIpfs.startsWith(IPFS_ROOT) || !recIpfs.startsWith(IPFS_ROOT)) {
    console.error(`WARNING: ${file} has non-standard IPFS schema URLs, leaving as-is`);
    continue;
  }

  const reqHttp = reqIpfs.replace(IPFS_ROOT + "/commons", HTTP_ROOT + "/commons");
  const recHttp = recIpfs.replace(IPFS_ROOT + "/commons", HTTP_ROOT + "/commons");

  card.schemas_mirror = {
    request: reqHttp,
    receipt: recHttp
  };

  fs.writeFileSync(fp, JSON.stringify(card, null, 2) + "\n", "utf8");
  console.log(`Updated schemas_mirror for ${file}`);
}

import fs from "fs";
import path from "path";

const AGENTS_DIR = path.join(process.cwd(), "agents");

// Desired key order for AgentCards
const ORDER = [
  "$schema",
  "$id",
  "id",
  "slug",
  "display_name",
  "description",
  "owner",
  "ens",
  "version",
  "status",
  "class",
  "implements",
  "schemas",
  "schemas_mirror",
  "entry",
  "capabilities",
  "meta",
  "networks",
  "license",
  "created_at",
  "updated_at"
];

for (const file of fs.readdirSync(AGENTS_DIR)) {
  if (!file.endsWith(".json")) continue;

  const fp = path.join(AGENTS_DIR, file);
  const raw = fs.readFileSync(fp, "utf8");
  const card = JSON.parse(raw);

  const newCard = {};

  // Apply canonical order
  for (const key of ORDER) {
    if (Object.prototype.hasOwnProperty.call(card, key)) {
      newCard[key] = card[key];
    }
  }

  // Preserve any unexpected extra keys (just in case)
  for (const key of Object.keys(card)) {
    if (!Object.prototype.hasOwnProperty.call(newCard, key)) {
      newCard[key] = card[key];
    }
  }

  fs.writeFileSync(fp, JSON.stringify(newCard, null, 2) + "\n", "utf8");
  console.log(`Reordered keys for ${file}`);
}

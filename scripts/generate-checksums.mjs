import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const PROFILES = {
  current: {
    roots: [".well-known", "agents/v1.1.0", "meta", "schemas/v1.1.0"],
    output: "checksums-v1.1.0.txt"
  },
  legacy: {
    roots: ["agents/v1.0.0", "schemas/v1.0.0"],
    output: "checksums-v1.0.0.txt"
  }
};

const profileName = (() => {
  const arg = process.argv.find((entry) => entry.startsWith("--profile="));
  if (arg) return arg.split("=")[1];
  const index = process.argv.indexOf("--profile");
  return index >= 0 ? process.argv[index + 1] : "current";
})();

if (!PROFILES[profileName]) {
  console.error(`❌ Unknown checksum profile: ${profileName}`);
  process.exit(1);
}

function sha256File(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  const buf = fs.readFileSync(fullPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function collectFiles(relativeRoot) {
  const out = [];
  const start = path.join(ROOT, relativeRoot);
  if (!fs.existsSync(start)) return out;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile()) out.push(path.relative(ROOT, full).replace(/\\/g, "/"));
    }
  }
  walk(start);
  return out;
}

function build(profile) {
  const files = profile.roots.flatMap(collectFiles).sort();
  return {
    text: files.map((relativePath) => `${sha256File(relativePath)}  ${relativePath}`).join("\n") + "\n",
    count: files.length
  };
}

const verify = process.argv.includes("--verify");
const profile = PROFILES[profileName];
const outputPath = path.join(ROOT, profile.output);
const { text, count } = build(profile);

if (verify) {
  const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (existing !== text) {
    console.error(`❌ ${profile.output} does NOT match ${profileName} artifacts.`);
    process.exit(1);
  }
  console.log(`✅ ${profile.output} matches ${profileName} artifacts.`);
} else {
  fs.writeFileSync(outputPath, text, "utf8");
  console.log(`✅ ${profile.output} written with ${count} entries.`);
}

#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
OUT="${2:-checksums.txt}"

cd "$ROOT"

# Canonical roots to hash (only include ones that exist)
ROOTS=( "agents" "meta" ".well-known" "schemas" "examples" )

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

# Find files under roots, normalize to POSIX paths, deterministic order
for r in "${ROOTS[@]}"; do
  if [ -e "$r" ]; then
    find "$r" -type f \
      -not -path "*/node_modules/*" \
      -not -path "*/.git/*" \
      -print
  fi
done \
| sed 's|^\./||' \
| LC_ALL=C sort > "$tmp"

# Write checksums in sha256sum format: "<hash><two spaces><path>"
# (Git Bash has sha256sum)
: > "$OUT"
while IFS= read -r f; do
  sha256sum "$f" >> "$OUT"
done < "$tmp"

echo "Wrote $(wc -l < "$OUT") checksums to $OUT"

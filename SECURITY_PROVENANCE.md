# Security & Provenance — CommandLayer Agent Cards

CommandLayer Agent Cards prove identity and routing intent. They do not prove execution success.

## Provenance model for v1.1.0

- canonical cards bind directly to tagged upstream Commons and Commercial schema URLs
- canonical cards also declare the expected `commandlayer.org` schema mirrors
- `meta/manifest.json` records the release index for those bindings
- root `checksums.txt` proves the integrity of the canonical repo release surfaces
- `dist-pin/agent-cards/v1.1.0/` is a derivative bundle reproduced from the canonical root files and hashed again with its own local `checksums.txt`

## Verification commands

- `npm run validate` verifies canonical structure, descriptors, and root checksums
- `npm run validate:release` verifies manifest alignment, derivative bundle reproducibility, and upstream binding resolution
- `npm run validate:release -- --require-mirrors` additionally requires published mirrors to resolve

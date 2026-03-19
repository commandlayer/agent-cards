# CommandLayer Agent Cards

This repo publishes the canonical CommandLayer Agent Cards. The current release line is **v1.1.0**. Cards are minimal discovery and binding artifacts: the cards bind ENS identities to upstream Commons or Commercial schemas, `meta/manifest.json` is the registry index, `.well-known/` surfaces discovery, `checksums.txt` verifies integrity, `legacy` stays archived under `agents/v1.0.0/`, and `dist-pin/agent-cards/v1.1.0/` is a reproducible **derivative** bundle generated from the canonical root files.

## Quick verification

```bash
npm install
npm run validate
cat meta/manifest.json
find agents/v1.1.0 -maxdepth 2 -type f | sort
find .well-known -maxdepth 1 -type f | sort
```

If you are preparing or auditing a release, also run:

```bash
npm run validate:release
# After mirrors are live:
npm run validate:release -- --require-mirrors
```

That trust path is the intended clean-clone review flow:

1. `npm run validate` validates the current v1.1.0 line, checks checksum determinism, and typechecks the tooling.
2. `meta/manifest.json` is the authoritative registry index for the current line.
3. `agents/v1.1.0/` contains the canonical current cards.
4. `.well-known/` exposes discovery descriptors that point back to the manifest and tier registries.
5. `agents/v1.0.0/` is preserved only as archival legacy material.
6. `dist-pin/agent-cards/v1.1.0/` is the reproducible publish bundle derived from the canonical root files.

## Authority model

- **Canonical source of truth:** root `agents/v1.1.0/`, `meta/`, `.well-known/`, and `schemas/v1.1.0/`
- **Registry index:** `meta/manifest.json`
- **Discovery surface:** `.well-known/agent.json` and `.well-known/agent-cards-v1.1.0.json`
- **Integrity surface:** root `checksums.txt`
- **Legacy scope:** `agents/v1.0.0/` and `schemas/v1.0.0/`
- **Publish bundle role:** `dist-pin/agent-cards/v1.1.0/` is derivative, never authoritative

## Current v1.1.0 binding rules

- cards live under `agents/v1.1.0/commons/` and `agents/v1.1.0/commercial/`
- the current card schema is `schemas/v1.1.0/agent.card.schema.json`
- the current descriptor schema is `schemas/v1.1.0/agent.descriptor.schema.json`
- v1.1.0 cards do **not** use `_shared`
- `schemas.request` and `schemas.receipt` bind directly to tagged upstream raw schema URLs
- `schemas_mirror.*` binds to the public `commandlayer.org` mirrors
- `entry` is always `x402://<ens>/<verb>/v1.1.0`

## Validation commands

- `npm run validate:current` — validate the canonical v1.1.0 cards and discovery descriptors
- `npm run validate:checksums` — verify root `checksums.txt`
- `npm run validate` — the default clean-clone trust command
- `npm run generate:dist-pin` — rebuild the derivative publish bundle from canonical root files
- `npm run validate:release` — release-scoped validation that:
  - confirms `meta/manifest.json` matches every current card binding
  - confirms `dist-pin/agent-cards/v1.1.0/` matches a freshly generated derivative bundle
  - resolves every upstream tagged schema URL over the network
  - optionally resolves mirrors when run with `--require-mirrors`

Routine CI stays on `npm run validate` so normal validation remains stable. Network binding checks are release-scoped and explicit.

## Release and publication model

The publication model is mechanical:

- **Source:** root canonical files in `agents/v1.1.0/`, `meta/`, `.well-known/`, and `schemas/v1.1.0/`
- **Bundle:** `dist-pin/agent-cards/v1.1.0/`, generated only by `npm run generate:dist-pin`
- **What gets hashed:** root `checksums.txt` hashes the repo release surfaces, including the derivative bundle; bundle-local `dist-pin/agent-cards/v1.1.0/checksums.txt` hashes only the bundle contents
- **What gets pinned:** the derivative bundle directory
- **How to reproduce it:** run `npm run generate:dist-pin`, then `npm run validate:checksums`, then `npm run validate:release`

Publication should therefore be read as: root is authoritative, dist-pin is the exact derivative package you pin and publish, and checksums prove both layers.

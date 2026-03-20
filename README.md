# CommandLayer Agent Cards

Agent Cards are CommandLayer's canonical discovery and binding artifacts. They bind ENS names to a single verb, the authoritative request/receipt schemas for that verb, the public schema mirrors, and the semver-pinned x402 entrypoint. They do not act as product pages, feature summaries, or semantic substitutes for the linked protocol schemas.

## Authority Model

- **Current canonical release line:** `v1.1.0`
- **Canonical source of truth:** root artifacts in this repository for the `v1.1.0` line (`agents/`, `schemas/`, `meta/`, `.well-known/`, `checksums.txt`)
- **Canonical registry index:** `meta/manifest.json`
- **Current discovery pointer:** `.well-known/agent.json`
- **Immutable versioned descriptor:** `.well-known/agent-cards-v1.1.0.json`
- **`dist-pin/` role:** published bundle generated from the root canonical artifacts for pinning/repinning; it is derivative and not a second source of truth
- **Checksum scope:** `checksums.txt` hashes both the authoritative root artifacts and the derived `dist-pin/` copies so reviewers can verify the canonical source set and the committed publication bundle separately
- **Legacy line:** `v1.0.0` is retained for archival compatibility only. It is superseded by `v1.1.0` and is not the primary release line. Legacy `v1.0.0` references may still point to IPFS-era locations, so treat them as archival compatibility material rather than the current authority path.

## Quick verification

- **Current Agent Cards line:** `v1.1.0`
- **Current Commons contract line:** `v1.1.0`
- **Current Commercial contract line:** `v1.1.0`
- **Legacy archival compatibility line:** `v1.0.0`

## Minimalism policy for v1.1.0 cards

A current-line card is intentionally narrow. It exists to publish canonical binding facts only:

- identity: `id`, `ens`, `owner`
- release line and lifecycle: `version`, `status`, `created_at`, `updated_at`
- protocol class and verb binding: `class`, `implements`
- linked schemas: `schemas`, `schemas_mirror`
- routing: `entry`
- minimal operational context: `networks`, `license`

v1.1.0 cards intentionally omit descriptive and editorial metadata such as display copy, capabilities summaries, tags, and extra links. If a detail is owned by the Commons or Commercial schema contract, the card links to that contract instead of restating it.

`v1.1.0` is the canonical line. The repository's default validation path, release bundle, discovery descriptors, and checksum coverage are all centered on `v1.1.0`. `v1.0.0` remains in-tree as an archival and compatibility line only.

## Design rule for v1.1.0

Agent Cards v1.1.0 is intentionally flat:

- cards live under `agents/v1.1.0/`
- current schemas live under `schemas/v1.1.0/`
- current cards use `schemas/v1.1.0/agent.card.schema.json`
- current discovery files use `schemas/v1.1.0/agent.descriptor.schema.json`
- current cards bind **directly** to published Commons / Commercial schema URLs
- current cards bind **directly** to `commandlayer.org` mirror URLs
- current v1.1.0 uses **no `_shared`**

## How card bindings work

For `v1.1.0`:

- `schemas.request` and `schemas.receipt` point to the tagged upstream schema source URLs
- `schemas_mirror.request` and `schemas_mirror.receipt` point to the public `commandlayer.org` mirrors
- `entry` remains `x402://<ens>/<verb>/v1.1.0`
- `meta/manifest.json` must exactly match the indexed cards for core binding fields

### Commons source pattern

`https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`

### Commons mirror pattern

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
- **Canonical branch for active work:** `main` is the branch for active development and CI; any older default-branch history should be treated as legacy hosting state, not a second authority path

```text
agent-cards/
├── agents/
│   ├── v1.0.0/                  # archival compatibility line
│   └── v1.1.0/                  # canonical cards
│       ├── commons/
│       └── commercial/
├── schemas/
│   ├── v1.0.0/                  # archival compatibility schemas
│   └── v1.1.0/                  # canonical schemas
│       ├── agent.card.schema.json
│       └── agent.descriptor.schema.json
├── meta/                        # canonical registry metadata
├── .well-known/                 # discovery pointers only
├── dist-pin/agent-cards/v1.1.0/ # derivative publish bundle for pinning
└── checksums.txt                # deterministic digests of release surfaces
```

## Example Commons v1.1.0 card

```json
{
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json",
  "$id": "https://commandlayer.org/agent-cards/agents/v1.1.0/commons/summarizeagent.eth.json",
  "id": "summarizeagent.eth",
  "owner": "commandlayer.eth",
  "ens": "summarizeagent.eth",
  "version": "1.1.0",
  "status": "protocol_reference",
  "class": "commons",
  "implements": ["summarize"],
  "schemas": {
    "request": "https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/summarize/summarize.request.schema.json",
    "receipt": "https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/summarize/summarize.receipt.schema.json"
  },
  "schemas_mirror": {
    "request": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.receipt.schema.json"
  },
  "entry": "x402://summarizeagent.eth/summarize/v1.1.0",
  "networks": ["eip155:1"],
  "license": "Apache-2.0",
  "created_at": "2025-11-22T00:00:00Z",
  "updated_at": "2026-03-19T00:00:00Z"
}
```

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

- descriptor schema conformance
- exact authoritative v1.1.0 card presence
- version / path / `$schema` / `$id` alignment
- direct Commons and Commercial source URL patterns
- direct `commandlayer.org` mirror URL patterns
- exact manifest/card cross-validation for indexed current-line entries
- entry URI correctness
- checksum determinism across authoritative root artifacts and the derivative dist-pin bundle so both surfaces can be reviewed independently

## Release surfaces

- root files and directories — canonical source of truth for the current `v1.1.0` line
- `meta/manifest.json` — canonical registry index for the release
- `.well-known/agent.json` — current discovery pointer to the canonical registry metadata
- `.well-known/agent-cards-v1.1.0.json` — immutable versioned discovery descriptor for `v1.1.0`
- `dist-pin/agent-cards/v1.1.0/` — derivative published bundle copied from canonical root artifacts for pinning/repinning
- `agents/v1.0.0/`, `schemas/v1.0.0/`, and `dist-pin/agent-cards/v1.0.0/` — archival compatibility surfaces only
- `checksums.txt` — deterministic artifact digests across the authoritative root release set and the committed derivative publish bundle

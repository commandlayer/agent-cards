# CommandLayer Agent Cards

Agent Cards are CommandLayer's canonical discovery and binding artifacts. They bind ENS names to a single verb, the authoritative request/receipt schemas for that verb, the public schema mirrors, and the semver-pinned x402 entrypoint. They do not act as product pages, feature summaries, or semantic substitutes for the linked protocol schemas.

In these cards, `x402://...` is the protocol-form entry identifier used by CommandLayer agents. It represents a standardized action endpoint (verb + route + version). This repository may interoperate with x402-related payment context where relevant, but it does not define x402 itself; see the external x402 protocol specification at `https://docs.x402.org/` for the canonical protocol definition.

See `CHANGELOG.md` for version differences.

## x402 compatibility

Commercial CommandLayer flows may reference payment proof or settlement artifacts aligned with the x402 protocol model where applicable. CommandLayer does not define the x402 protocol itself; it interoperates with that payment context as an external protocol surface.

See the x402 protocol specification for the canonical definition: `https://docs.x402.org/`.

## Release authority at a glance

- **Current line:** `v1.1.0`
- **Canonical current-line surfaces:** root `agents/v1.1.0/`, `schemas/v1.1.0/`, `meta/`, `.well-known/`, and `checksums.txt`
- **Canonical registry index:** `meta/manifest.json`
- **Derivative current-line bundle:** `dist-pin/agent-cards/v1.1.0/` is a committed reproducible copy of the root release surfaces for pinning/repinning; it is not authoritative
- **Discovery-only surfaces:** `.well-known/agent.json` and `.well-known/agent-cards-v1.1.0.json` point reviewers to the registry metadata; they do not replace the manifest or cards
- **Current authority model:** `v1.1.0` is the only current line in this repository. `v1.0.0` remains preserved for archival compatibility only and must not be treated as the current release

## Minimalism policy for v1.1.0 cards

A current-line card is intentionally narrow. It exists to publish canonical binding facts only:

- identity: `id`, `ens`, `owner`
- release line and lifecycle: `version`, `status`, `created_at`, `updated_at`
- protocol class and verb binding: `class`, `implements`
- linked schemas: `schemas`, `schemas_mirror`
- routing: `entry`
- minimal operational context: `networks`, `license`

v1.1.0 cards intentionally omit descriptive and editorial metadata such as display copy, capabilities summaries, tags, and extra links. If a detail is owned by the Commons or Commercial schema contract, the card links to that contract instead of restating it.

`v1.1.0` is the current release-candidate line. The repository centers validation, checksums, discovery descriptors, and the derivative dist-pin bundle on this line. The repository does **not** claim that publication is complete merely because those files exist; publication claims require successful release validation and external bindings where applicable. `v1.0.0` remains in-tree only as archival compatibility material.

## Design rule for v1.1.0

Agent Cards v1.1.0 is intentionally flat:

- cards live under `agents/v1.1.0/`
- current schemas live under `schemas/v1.1.0/`
- current cards use `schemas/v1.1.0/agent.card.schema.json`
- current discovery files use `schemas/v1.1.0/agent.descriptor.schema.json`
- current cards bind directly to the tagged Commons / Commercial schema source URLs
- current cards bind directly to the public `commandlayer.org` schema mirrors
- current v1.1.0 uses no `_shared`

## How card bindings work

For `v1.1.0`:

- `schemas.request` and `schemas.receipt` point to the tagged upstream schema source URLs
- `schemas_mirror.request` and `schemas_mirror.receipt` point to the public `commandlayer.org` mirrors
- `entry` remains `x402://<ens>/<verb>/v1.1.0`
- `meta/manifest.json` must exactly match the indexed cards for core binding fields

### Commons source pattern

`https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`

`https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

### Commons mirror pattern

`https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`

`https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

### Commercial source pattern

`https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`

`https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

### Commercial mirror pattern

`https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`

`https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

## Validation

Run the canonical local gate:

```bash
npm run validate
```

Run the canonical release gate:

```bash
npm run validate:release
# After mirrors are expected to be live:
npm run validate:release -- --require-mirrors
```

`validate` checks local structure and checksums. `validate:release` adds external URL resolution and derivative-bundle reproducibility. Until those checks pass, the repository should be read as a prepared current line rather than as proof that every external publication surface is already live.

That trust path is the intended clean-clone review flow:

1. `npm run validate` validates the current v1.1.0 line and verifies `checksums.txt`.
2. `meta/manifest.json` is the authoritative registry index for the current line.
3. `agents/v1.1.0/` contains the canonical current cards.
4. `.well-known/` exposes discovery descriptors that point back to the manifest and tier registries.
5. `dist-pin/agent-cards/v1.1.0/` is the committed reproducible derivative bundle derived from the canonical root files.
6. `agents/v1.0.0/`, `schemas/v1.0.0/`, and `dist-pin/agent-cards/v1.0.0/` are archival-only legacy material.

## Authority model

- **Canonical source of truth:** root `agents/v1.1.0/`, `meta/`, `.well-known/`, `schemas/v1.1.0/`, and `checksums.txt`
- **Registry index:** `meta/manifest.json`
- **Discovery surfaces:** `.well-known/agent.json` and `.well-known/agent-cards-v1.1.0.json` are pointers only
- **Derivative bundle role:** `dist-pin/agent-cards/v1.1.0/` is committed, derivative, reproducible from the repository root, and never authoritative
- **Legacy scope:** `agents/v1.0.0/`, `schemas/v1.0.0/`, and `dist-pin/agent-cards/v1.0.0/` are archival compatibility surfaces only

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
├── dist-pin/agent-cards/v1.1.0/ # committed derivative publish bundle for pinning
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

- `npm run validate` — the canonical local validation entrypoint for canonical v1.1.0 cards, discovery descriptors, manifest alignment, and `checksums.txt`
- `node scripts/build-dist-pin.mjs` — rebuild the committed derivative publish bundle from canonical root files
- `npm run validate:release` — the canonical release validation entrypoint; it runs `npm run validate` first and then:
  - confirms `meta/manifest.json` matches every current card binding
  - confirms `dist-pin/agent-cards/v1.1.0/` matches a freshly generated derivative bundle
  - resolves every upstream tagged schema URL over the network
  - optionally resolves mirrors when run with `--require-mirrors`

Routine CI shows both gates explicitly: `npm run validate` for the local release gate, then `npm run validate:release` for the release-grade gate. Mirror resolution remains explicit and opt-in in routine CI; enforce it with `npm run validate:release -- --require-mirrors` once the published mirrors are expected to be live for the exact tag being pushed.

## Release and publication model

The current release review checks:

- descriptor schema conformance
- exact authoritative v1.1.0 card presence
- version / path / `$schema` / `$id` alignment
- direct Commons and Commercial source URL patterns
- direct `commandlayer.org` mirror URL patterns
- exact manifest/card cross-validation for indexed current-line entries
- entry URI correctness
- checksum determinism across authoritative root artifacts and the derivative dist-pin bundle so both surfaces can be reviewed independently

## Release procedure

Use one clean ceremony from "ready" to public release. Do not substitute alternate wrappers or partial checks.

1. Edit only the canonical root artifacts for the current `v1.1.0` line.
2. Rebuild the committed derivative bundle with `npm run generate:dist-pin`.
3. Regenerate root integrity digests with `node scripts/generate-checksums.mjs`.
4. Run the canonical local gate: `npm run validate`.
5. Run the canonical release gate: `npm run validate:release`.
6. Verify the checksum file you are about to publish is the one you just validated (`checksums.txt` must remain unchanged between steps 4-5 and tagging).
7. Create the release tag from that exact validated commit.
8. Push the commit and tag.
9. Run the final public verification: `npm run validate:release -- --require-mirrors` only after upstream tags and `commandlayer.org` mirrors are expected to be live.
10. Confirm the public release artifacts resolve from the pushed tag, published checksum set, upstream schema tags, and mirrors before announcing completion.

Recommended command order for maintainers:

```bash
npm run generate:dist-pin
node scripts/generate-checksums.mjs
npm run validate
npm run validate:release
git tag <tag>
git push origin main --follow-tags
npm run validate:release -- --require-mirrors
```

This keeps the trust story narrow: root artifacts are canonical, `dist-pin/` is a committed derivative publish bundle, `.well-known/` remains discovery-only, checksum verification is explicit, and the pushed tag plus checksums identify the release snapshot. If external publish surfaces are not live yet, the release is not fully verified; do not hide that state.

## Release surfaces

- root files and directories — canonical source of truth for the current `v1.1.0` line
- `meta/manifest.json` — canonical registry index for the release
- `.well-known/agent.json` — current discovery pointer to the canonical registry metadata
- `.well-known/agent-cards-v1.1.0.json` — immutable versioned discovery descriptor for `v1.1.0`
- `dist-pin/agent-cards/v1.1.0/` — committed derivative published bundle copied from canonical root artifacts for pinning/repinning and reproducible from the repository root
- `agents/v1.0.0/`, `schemas/v1.0.0/`, and `dist-pin/agent-cards/v1.0.0/` — archival compatibility surfaces only
- `checksums.txt` — deterministic artifact digests across the authoritative root release set and the committed derivative publish bundle

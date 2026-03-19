# Specification — CommandLayer Agent Cards

## One-line model

This repo publishes canonical CommandLayer Agent Cards for the current **v1.1.0** line. Cards are minimal discovery and binding artifacts, `meta/manifest.json` is the registry index, `.well-known/` exposes discovery, root checksums verify integrity, legacy is archival, and `dist-pin/agent-cards/v1.1.0/` is a derivative publish bundle reproduced from the canonical root files.

## Canonical current surfaces

- `agents/v1.1.0/` — canonical current cards
- `schemas/v1.1.0/agent.card.schema.json` — canonical card schema
- `schemas/v1.1.0/agent.descriptor.schema.json` — canonical discovery schema
- `meta/manifest.json` — authoritative registry index
- `.well-known/agent.json` — current discovery descriptor
- `.well-known/agent-cards-v1.1.0.json` — versioned discovery descriptor

## Legacy surfaces

- `agents/v1.0.0/`
- `schemas/v1.0.0/`

These remain for archival compatibility only. They are not the current release line.

## Card contract for v1.1.0

Every canonical v1.1.0 card MUST:

- live under `agents/v1.1.0/<tier>/`
- declare `version: "1.1.0"`
- use `$schema: "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json"`
- use `$id` equal to the canonical HTTPS card path
- use `entry: "x402://<ens>/<implements[0]>/v1.1.0"`
- avoid `_shared` references
- bind directly to tagged upstream Commons or Commercial raw schema URLs
- bind directly to the matching `commandlayer.org` schema mirror URLs

## Registry and discovery contract

- `meta/manifest.json` is the release index for the current line.
- `.well-known/*` MUST point back to `meta/manifest.json`, `meta/commons-agent.json`, and `meta/commercial-agent.json`.
- `meta/commons-agent.json` and `meta/commercial-agent.json` describe the tier roots for the current line only.

## Publication contract

- root files are authoritative
- `dist-pin/agent-cards/v1.1.0/` is derivative
- the derivative bundle MUST be produced by `scripts/build-dist-pin.mjs`
- the derivative bundle MUST match the canonical root files byte-for-byte for the included surfaces
- root `checksums.txt` covers the release surfaces in the repo, including the derivative bundle
- bundle-local `dist-pin/agent-cards/v1.1.0/checksums.txt` covers the bundle contents only

## Conformance

A repo state is conformant when:

- `npm run validate` passes for the current line
- `npm run validate:release` verifies manifest alignment and bundle reproducibility
- upstream release schema URLs resolve when release validation runs
- mirrors resolve once publication is live and release validation is run with `--require-mirrors`

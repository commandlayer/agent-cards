# Onboarding — CommandLayer Agent Cards

## Start here

Agent Cards v1.1.0 is the current canonical release line. Root repository artifacts are authoritative.

- root `agents/v1.1.0/`, `meta/`, `.well-known/`, and `schemas/v1.1.0/` are canonical
- `meta/manifest.json` is the registry index
- `.well-known/` is discovery
- `checksums.txt` proves integrity for both the authoritative root artifacts and the committed derivative `dist-pin/` bundle
- `agents/v1.0.0/` and `schemas/v1.0.0/` are archival legacy
- `dist-pin/agent-cards/v1.1.0/` is a generated derivative publish bundle

- `agents/v1.1.0/commons/*.json`
- `agents/v1.1.0/commercial/*.json`
- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`
- `meta/manifest.json` as the canonical registry index
- `.well-known/agent.json` only as the current discovery pointer

Do not add new `_shared` helpers for v1.1.0.
Do not add descriptive fields to current-line cards; if the detail is not a binding fact, keep it in external documentation or in the linked protocol schemas instead.

## Legacy / compatibility

- `v1.0.0` is superseded by `v1.1.0`.
- Some legacy `v1.0.0` references may still use IPFS-era addressing; keep them for archival compatibility, not as the current authority path or a repo-only liveness guarantee.
- Keep `v1.0.0` artifacts only for archival compatibility.
- Do not use `v1.0.0` paths in new examples, new release work, or the main update flow.

## Update flow for the current line

1. edit the canonical root artifact under the correct `v1.1.0` path
2. keep `$schema`, `$id`, `version`, `entry`, and schema URLs aligned
3. update `meta/manifest.json` and related registry/discovery pointers if routing changes
4. refresh the derivative publish bundle at `dist-pin/agent-cards/v1.1.0/`
5. regenerate `checksums.txt`
6. update `RESOLUTION.md`
7. run `npm run validate`

## Branch model

- `main` is the canonical branch for active development and CI.
- If hosting still shows an older default branch, that is a maintainer-side repository setting to clean up; it does not change which branch is authoritative.

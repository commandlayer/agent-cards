# Onboarding — CommandLayer Agent Cards

## Start here

Agent Cards v1.1.0 is the current canonical release line. Root repository artifacts are authoritative.

- root `agents/v1.1.0/`, `meta/`, `.well-known/`, and `schemas/v1.1.0/` are canonical
- `meta/manifest.json` is the registry index
- `.well-known/` is discovery
- `checksums.txt` proves integrity
- `agents/v1.0.0/` and `schemas/v1.0.0/` are archival legacy
- `dist-pin/agent-cards/v1.1.0/` is a committed generated derivative publish bundle

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
- Keep `v1.0.0` artifacts only for archival compatibility.
- Do not use `v1.0.0` paths in new examples, new release work, or the main update flow.

## Update flow for the current line

1. edit the canonical root artifact under the correct `v1.1.0` path
2. keep `$schema`, `$id`, `version`, `entry`, and schema URLs aligned
3. update `meta/manifest.json` and related registry/discovery pointers if routing changes
4. rebuild the committed derivative publish bundle at `dist-pin/agent-cards/v1.1.0/` with `node scripts/build-dist-pin.mjs`
5. regenerate `checksums.txt` with `node scripts/generate-checksums.mjs`
6. update `RESOLUTION.md`
7. run `npm run validate:current`, `npm run validate:checksums`, and `npm run validate:release`
8. after review, have a maintainer create or move the release tag on the exact validated commit; the release snapshot is the tagged commit plus `checksums.txt`

## Release procedure

- Root artifacts are canonical.
- `dist-pin/agent-cards/v1.1.0/` is committed to git, but it is always rebuilt from the canonical root artifacts and is never an independent authority surface.
- `.well-known/` is discovery-only.
- A maintainer must create or move any release tag after validation; this repo does not imply that an unreleased tag already exists.
- The release snapshot is defined by the tagged commit together with `checksums.txt`.

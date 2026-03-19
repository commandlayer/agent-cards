# Onboarding — Agent Cards

## Current model

Agent Cards v1.1.0 is the current canonical release line. Root repository artifacts are authoritative.

Use:

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

## Update flow

1. edit the canonical root artifact under the correct `v1.1.0` path
2. keep `$schema`, `$id`, `version`, `entry`, and schema URLs aligned
3. update `meta/manifest.json` and related registry/discovery pointers if routing changes
4. refresh the derivative publish bundle at `dist-pin/agent-cards/v1.1.0/`
5. regenerate `checksums.txt`
6. update `RESOLUTION.md`
7. run `npm run validate`

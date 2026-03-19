# Onboarding — Agent Cards

## Current model

Agent Cards v1.1.0 is flat, release-oriented, and intentionally minimal.

Use:

- `agents/v1.1.0/commons/*.json`
- `agents/v1.1.0/commercial/*.json`
- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`

Do not add new `_shared` helpers for v1.1.0.
Do not add descriptive fields to current-line cards; if the detail is not a binding fact, keep it in external documentation or in the linked protocol schemas instead.

## Update flow

1. edit the card under the correct tier
2. keep `$schema`, `$id`, `version`, `entry`, and schema URLs aligned
3. keep the card minimal; do not add capabilities, descriptions, tags, or convenience links
4. update manifest / registry / discovery files if routing changes
5. refresh `dist-pin/agent-cards/v1.1.0/`
6. regenerate `checksums.txt`
7. update `RESOLUTION.md`
8. run `npm run validate`

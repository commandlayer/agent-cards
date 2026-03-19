# Onboarding — Agent Cards

## Current model

Agent Cards v1.1.0 is flat and release-oriented.

Use:

- `agents/v1.1.0/commons/*.json`
- `agents/v1.1.0/commercial/*.json`
- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`

Do not add new `_shared` helpers for v1.1.0.

## Update flow

1. edit the card under the correct tier
2. keep `$schema`, `$id`, `version`, `entry`, and schema URLs aligned
3. update manifest / registry / discovery files if routing changes
4. refresh `dist-pin/agent-cards/v1.1.0/`
5. regenerate `checksums.txt`
6. update `RESOLUTION.md`
7. run `npm run validate`

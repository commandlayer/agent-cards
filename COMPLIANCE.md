# Compliance — Agent Cards

## Current-line release compliance (`v1.1.0`)

Agent Cards v1.1.0 is release-compliant when:

- current cards validate under `schemas/v1.1.0/agent.card.schema.json`
- current discovery validates under `schemas/v1.1.0/agent.descriptor.schema.json`
- the authoritative `agents/v1.1.0/` card set is complete and exact
- current cards use no `_shared` references
- Commons and Commercial bindings are flat and direct
- checksums cover release artifacts including `dist-pin/agent-cards/v1.1.0/`
- `npm run validate` passes

## Legacy compatibility scope (`v1.0.0`)

`v1.0.0` is retained for compatibility and archival readability, not as the repository's normative release line.

That means:

- legacy cards continue to validate against the preserved `schemas/v1.0.0/_shared/agent.card.base.schema.json`
- legacy cards may still carry historical metadata shapes that are no longer part of `v1.1.0`
- legacy validation is run explicitly through `npm run validate:legacy`, not treated as the default release authority path
- legacy artifacts are maintained to avoid obvious breakage or fabricated placeholders, but they are not upgraded to claim current-line provenance guarantees

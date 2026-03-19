# Compliance — Agent Cards

Agent Cards v1.1.0 is compliant when:

- current cards validate under `schemas/v1.1.0/agent.card.schema.json`
- current discovery validates under `schemas/v1.1.0/agent.descriptor.schema.json`
- `meta/manifest.json` remains the canonical registry index
- `.well-known/` remains discovery-only
- current cards use no `_shared` references
- Commons and Commercial bindings are flat and direct
- the derivative `dist-pin/agent-cards/v1.1.0/` bundle reflects the canonical root artifacts
- checksums cover release artifacts including `dist-pin/agent-cards/v1.1.0/`
- `v1.0.0` remains clearly separated as an archival compatibility surface

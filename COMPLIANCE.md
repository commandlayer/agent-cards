# Compliance — CommandLayer Agent Cards

The current release line is compliant when all of the following are true:

- canonical v1.1.0 cards in `agents/v1.1.0/` validate under `schemas/v1.1.0/agent.card.schema.json`
- discovery descriptors in `.well-known/` validate under `schemas/v1.1.0/agent.descriptor.schema.json`
- `meta/manifest.json` matches the current cards exactly
- v1.1.0 cards use no `_shared` references
- upstream schema bindings are direct, version-tagged, and resolvable during release validation
- mirrors are direct and can be required during publish-time release validation
- `dist-pin/agent-cards/v1.1.0/` matches a freshly generated derivative bundle
- `checksums.txt` matches the repo release surfaces

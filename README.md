# CommandLayer Agent Cards

CommandLayer Agent Cards are canonical discovery and binding artifacts. Every current and archival card in this repository now follows one normalized schema-binding pattern:

- `schemas.request` and `schemas.receipt` use canonical hosted schema URLs under `https://commandlayer.org/schemas/...`
- raw GitHub schema URLs are source-of-record provenance only and are **not** part of the published card surface
- the legacy duplicate schema field is removed everywhere
- **Commons** cards execute through `https://runtime.commandlayer.org/execute`
- **Commercial** cards execute through `x402://<agent>/<verb>/v1.1.0`

## Canonical routing model

### Schemas
Schemas are resolved via `commandlayer.org` and published as the canonical identifiers used by cards, manifests, examples, and validation.

Commons pattern:

- `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

Commercial pattern:

- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

GitHub remains the source repository location for protocol schemas, but GitHub URLs are not a protocol surface and must not appear in published Agent Card bindings.

### Entry behavior

- **Commons** use the shared runtime endpoint: `https://runtime.commandlayer.org/execute`
- **Commercial** use the semver-pinned x402 route: `x402://<agent>/<verb>/v1.1.0`

This repo does not define x402 itself. See `https://docs.x402.org/` for the external x402 protocol specification.

## Authority model

- Current release line: `v1.1.0`
- Canonical current-line cards: `agents/v1.1.0/`
- Canonical current-line schemas: `schemas/v1.1.0/`
- Canonical registry index: `meta/manifest.json`
- Discovery pointers: `.well-known/`
- Derivative publish bundle: `dist-pin/agent-cards/v1.1.0/`
- Archival compatibility line: `v1.0.0`

The repository root is authoritative. The `dist-pin/` bundle is reproducible and committed for distribution convenience, but it is not a co-equal source of truth.

## Current card shape

A current card publishes only binding facts:

- identity: `id`, `ens`, `owner`
- lifecycle: `version`, `status`, `created_at`, `updated_at`
- binding: `class`, `implements`, `schemas`, `entry`
- context: `networks`, `license`

## Example Commons card

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
    "request": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.receipt.schema.json"
  },
  "entry": "https://runtime.commandlayer.org/execute",
  "networks": ["eip155:1"],
  "license": "Apache-2.0",
  "created_at": "2025-11-22T00:00:00Z",
  "updated_at": "2026-03-21T00:00:00Z"
}
```

## Validation

```bash
npm run validate
npm run validate:release
```

- `npm run validate` checks schema/card integrity, manifest alignment, entry normalization, and checksum coverage.
- `npm run validate:release` adds external resolution of canonical hosted schema URLs and verifies that `dist-pin/agent-cards/v1.1.0/` matches a fresh rebuild.

## Release expectations

1. Edit canonical root artifacts.
2. Rebuild `dist-pin/` with `npm run generate:dist-pin`.
3. Regenerate `checksums.txt`.
4. Run `npm run validate`.
5. Run `npm run validate:release`.

See `SPEC.md` for the normative rules and `CHANGELOG.md` for release-line differences.

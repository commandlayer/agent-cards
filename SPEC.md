# Specification — Agent Cards

This document defines the Agent Cards v1.1.0 identity and routing contract.

## 1. Scope

Agent Cards publish only canonical binding facts:

- ENS-based identity
- owner attribution
- primary verb support
- request and receipt schema bindings
- public mirror bindings
- x402 entry routing
- lifecycle and release provenance needed to interpret the artifact

They do not define semantic meaning, feature behavior, or implementation detail. Commons and Commercial own the schema contract.

## 2. Current schema files

Current Agent Cards v1.1.0 uses only:

- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`

Current Agent Cards v1.1.0 MUST NOT use `_shared`.

## 3. Minimal canonical card fields

Every v1.1.0 card MUST include only the current binding contract fields:

- `$schema`
- `$id`
- `id`
- `owner`
- `ens`
- `version`
- `status`
- `class`
- `implements`
- `schemas.request`
- `schemas.receipt`
- `schemas_mirror.request`
- `schemas_mirror.receipt`
- `entry`
- `networks`
- `license`
- `created_at`
- `updated_at`

v1.1.0 cards MUST NOT add descriptive overlays such as display labels, prose summaries, capabilities lists, tag clouds, or duplicate links to already-bound schema targets.

## 4. Versioning rules

- v1.1.0 cards live under `agents/v1.1.0/`
- `version` MUST equal `1.1.0`
- `$schema` MUST equal `https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json`
- `$id` MUST match the card's canonical HTTPS path
- `entry` MUST be `x402://<ens>/<implements[0]>/v1.1.0`

## 5. Binding rules

### 5.1 Commons

A Commons v1.1.0 card MUST bind directly to:

- source request URL: `https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- source receipt URL: `https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`
- mirror request URL: `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- mirror receipt URL: `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

### 5.2 Commercial

A Commercial v1.1.0 card MUST bind directly to:

- source request URL: `https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- source receipt URL: `https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`
- mirror request URL: `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- mirror receipt URL: `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

Commercial v1.1.0 is flat in the same style as Commons v1.1.0.

## 6. Manifest alignment rules

`meta/manifest.json` is an index, not an independent source of truth. For every indexed current-line card:

- every manifest entry MUST resolve to a real card file
- every current-line card file MUST appear exactly once in the manifest
- manifest `id`, `version`, `class`, `verb`, `status`, `networks`, schema URLs, mirror URLs, `agent_card`, and `entry` MUST exactly match the card
- binding counts and current release roots MUST match the indexed cards

## 7. Descriptor rules

Current discovery descriptors MUST validate under `schemas/v1.1.0/agent.descriptor.schema.json` and point at:

- `meta/manifest.json`
- `meta/commons-agent.json`
- `meta/commercial-agent.json`

## 8. Conformance

A repo state is conformant when:

- the authoritative v1.1.0 card set exists
- current cards use no `_shared` references
- current cards contain only the minimal canonical binding fields
- cards point at direct published source URLs and direct `commandlayer.org` mirrors
- `meta/manifest.json` exactly matches the indexed current-line cards
- discovery and manifest files describe the same current release line
- `checksums.txt` matches repo contents
- `npm run validate` passes

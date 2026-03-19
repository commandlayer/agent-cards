# Specification — Agent Cards

This document defines the Agent Cards v1.1.0 identity and routing contract.

## 1. Scope

Agent Cards describe:

- ENS-based identity
- primary verb support
- request and receipt schema bindings
- public mirror bindings
- x402 entry routing
- minimal discovery metadata

They do not define semantic meaning. Commons and Commercial own the schema contract.

## 2. Current schema files

Current Agent Cards v1.1.0 uses only:

- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`

Current Agent Cards v1.1.0 MUST NOT use `_shared`.

## 3. Required card fields

Every v1.1.0 card MUST include:

- `$schema`
- `$id`
- `id`
- `slug`
- `display_name`
- `description`
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

## 6. Descriptor rules

Current discovery descriptors MUST validate under `schemas/v1.1.0/agent.descriptor.schema.json` and point at:

- `meta/manifest.json`
- `meta/commons-agent.json`
- `meta/commercial-agent.json`

## 7. Conformance

A repo state is conformant when:

- the authoritative v1.1.0 card set exists
- current cards use no `_shared` references
- cards point at direct published source URLs and direct `commandlayer.org` mirrors
- discovery and manifest files describe the same current release line
- `checksums.txt` matches repo contents
- `npm run validate` passes

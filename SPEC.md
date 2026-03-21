# Specification — CommandLayer Agent Cards

## 1. One-line model

This repo maintains canonical CommandLayer Agent Cards for the current **v1.1.0** release-candidate line. Cards are minimal discovery and binding artifacts, `meta/manifest.json` is the registry index, `.well-known/` exposes discovery pointers, root checksums verify integrity, legacy material is archival only, and `dist-pin/agent-cards/v1.1.0/` is a derivative current-line bundle reproduced from the canonical root files.

Agent Cards publish only canonical binding facts:

- ENS-based identity
- owner attribution
- primary verb support
- request and receipt schema bindings
- public mirror bindings
- x402 entry routing
- lifecycle and release provenance needed to interpret the artifact

They do not define semantic meaning, feature behavior, or implementation detail. Commons and Commercial own the schema contract.

## 2. Authority and release lines

- `v1.1.0` is the current release-candidate Agent Cards line.
- Root repository artifacts for `v1.1.0` are authoritative.
- `meta/manifest.json` is the canonical registry index.
- `.well-known/agent.json` is the current discovery pointer.
- `.well-known/agent-cards-v1.1.0.json` is the immutable versioned descriptor for the current line.
- `.well-known/` files are discovery surfaces only; they do not replace the manifest or card files as authority.
- `dist-pin/agent-cards/v1.1.0/` is a derivative current-line bundle for pinning/repinning and is not an independent source of truth.
- `checksums.txt` covers both the authoritative root artifacts and the derived `dist-pin/` bundle so reviewers can verify source and derivative release surfaces independently.
- `v1.0.0` is superseded and retained only for archival compatibility. Legacy `v1.0.0` references may still rely on IPFS-era addressing and must be read as archival material, not the current authority path.

## 3. Current schema files

The current line uses exactly these repository-owned schema files:

- `schemas/v1.1.0/agent.card.schema.json`
- `schemas/v1.1.0/agent.descriptor.schema.json`

Legacy schema files under `schemas/v1.0.0/` remain in-tree only to preserve the archived `v1.0.0` line. They are not part of the current authority model.

## 4. Required card fields

Every canonical v1.1.0 card MUST satisfy the current schema and include the current-line publication fields.

The v1.1.0 JSON Schema requires 14 top-level fields. That count does not include `$schema` or `$id`, because neither field appears in the schema's top-level `required` array:

- `id`
- `owner`
- `ens`
- `version`
- `status`
- `class`
- `implements`
- `schemas`
- `schemas_mirror`
- `entry`
- `networks`
- `license`
- `created_at`
- `updated_at`

The schema also requires `schemas.request`, `schemas.receipt`, `schemas_mirror.request`, and `schemas_mirror.receipt`.

`$schema` and `$id` are defined properties and current-line repo publication fields, but they are not schema-required fields.

## 5. Versioning rules

- v1.1.0 cards live under `agents/v1.1.0/`
- `version` MUST equal `1.1.0`
- `$schema` MUST equal `https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json`
- `$id` MUST match the card's canonical HTTPS path
- `entry` MUST be `x402://<ens>/<implements[0]>/v1.1.0`
- `x402://` is the protocol-form entry identifier used by CommandLayer agents; it represents a standardized action endpoint (verb + route + version). See `https://docs.x402.org/` for the external protocol reference
- Commercial artifacts MAY include x402-aligned payment proof or settlement references where applicable. The x402 protocol is external to this specification and should be treated as its own canonical protocol surface at `https://docs.x402.org/`.
- v1.0.0 MAY remain in the repository only as a legacy archival compatibility surface

## 6. Binding rules

### 6.1 Commons

A Commons v1.1.0 card MUST bind directly to:

- source request URL: `https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- source receipt URL: `https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`
- mirror request URL: `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- mirror receipt URL: `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

### 6.2 Commercial

A Commercial v1.1.0 card MUST bind directly to:

- source request URL: `https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- source receipt URL: `https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`
- mirror request URL: `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- mirror receipt URL: `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

Commercial v1.1.0 is flat in the same style as Commons v1.1.0.

## 7. Descriptor rules

Current discovery descriptors MUST validate under `schemas/v1.1.0/agent.descriptor.schema.json` and point at:

- `meta/manifest.json`
- `meta/commons-agent.json`
- `meta/commercial-agent.json`

Discovery descriptors are pointers. They are not the canonical registry index.

## 8. Conformance

A repo state is conformant when:

- the authoritative v1.1.0 card set exists
- current cards use no `_shared` references
- current cards contain only the minimal canonical binding fields
- cards point at direct source URLs and intended `commandlayer.org` mirrors for release validation
- `meta/manifest.json` describes the same current release line as the discovery descriptors
- the derivative `dist-pin/agent-cards/v1.1.0/` bundle matches the canonical root release artifacts
- `checksums.txt` matches repo contents
- `npm run validate` passes

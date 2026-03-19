# Specification — CommandLayer Agent Cards

## One-line model

This repo publishes canonical CommandLayer Agent Cards for the current **v1.1.0** line. Cards are minimal discovery and binding artifacts, `meta/manifest.json` is the registry index, `.well-known/` exposes discovery, root checksums verify integrity, legacy is archival, and `dist-pin/agent-cards/v1.1.0/` is a derivative publish bundle reproduced from the canonical root files.

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

- `v1.1.0` is the current canonical Agent Cards line.
- Root repository artifacts for `v1.1.0` are authoritative.
- `meta/manifest.json` is the canonical registry index.
- `.well-known/agent.json` is the current discovery pointer.
- `.well-known/agent-cards-v1.1.0.json` is the immutable versioned descriptor for the canonical line.
- `dist-pin/agent-cards/v1.1.0/` is a derivative published bundle for pinning/repinning and is not an independent source of truth.
- `v1.0.0` is superseded and retained only for archival compatibility.

## 3. Current schema files

These remain for archival compatibility only. They are not the current release line.

## Card contract for v1.1.0

Every canonical v1.1.0 card MUST:

## 4. Required card fields

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

## 5. Versioning rules

- v1.1.0 cards live under `agents/v1.1.0/`
- `version` MUST equal `1.1.0`
- `$schema` MUST equal `https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json`
- `$id` MUST match the card's canonical HTTPS path
- `entry` MUST be `x402://<ens>/<implements[0]>/v1.1.0`
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
- cards point at direct published source URLs and direct `commandlayer.org` mirrors
- `meta/manifest.json` describes the same current release line as the discovery descriptors
- the derivative `dist-pin/agent-cards/v1.1.0/` bundle matches the canonical root release artifacts
- `checksums.txt` matches repo contents
- `npm run validate` passes

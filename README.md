# Agent Cards — CommandLayer

Agent Cards are CommandLayer's identity and routing layer. They bind ENS names to canonical verbs, published request/receipt schemas, and semver-pinned x402 entrypoints without redefining the semantic contract.

## Current version story

- **Current Agent Cards line:** `v1.1.0`
- **Current Commons contract line:** `v1.1.0`
- **Current Commercial contract line:** `v1.1.0`
- **Legacy line retained for compatibility:** `v1.0.0`

## Design rule for v1.1.0

Agent Cards v1.1.0 is intentionally flat:

- cards live under `agents/v1.1.0/`
- current schemas live under `schemas/v1.1.0/`
- current cards use `schemas/v1.1.0/agent.card.schema.json`
- current discovery files use `schemas/v1.1.0/agent.descriptor.schema.json`
- current cards bind **directly** to published Commons / Commercial schema URLs
- current cards bind **directly** to `commandlayer.org` mirror URLs
- current v1.1.0 uses **no `_shared`**

## How card bindings work

For `v1.1.0`:

- `schemas.request` and `schemas.receipt` point to the tagged upstream schema source URLs
- `schemas_mirror.request` and `schemas_mirror.receipt` point to the public `commandlayer.org` mirrors
- `entry` remains `x402://<ens>/<verb>/v1.1.0`

### Commons source pattern

`https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`

### Commons mirror pattern

`https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`

### Commercial source pattern

`https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`

### Commercial mirror pattern

`https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`

## Repository layout

```text
agent-cards/
├── agents/
│   ├── v1.0.0/
│   └── v1.1.0/
│       ├── commons/
│       └── commercial/
├── schemas/
│   ├── v1.0.0/
│   └── v1.1.0/
│       ├── agent.card.schema.json
│       └── agent.descriptor.schema.json
├── meta/
├── .well-known/
├── dist-pin/
├── checksums-v1.1.0.txt
└── checksums-v1.0.0.txt
```

## Example Commons v1.1.0 card

```json
{
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json",
  "$id": "https://commandlayer.org/agent-cards/agents/v1.1.0/commons/summarizeagent.eth.json",
  "id": "summarizeagent.eth",
  "version": "1.1.0",
  "class": "commons",
  "implements": ["summarize"],
  "schemas": {
    "request": "https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/summarize/summarize.request.schema.json",
    "receipt": "https://raw.githubusercontent.com/commandlayer/protocol-commons/refs/tags/v1.1.0/schemas/v1.1.0/commons/summarize/summarize.receipt.schema.json"
  },
  "schemas_mirror": {
    "request": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.1.0/commons/summarize/summarize.receipt.schema.json"
  },
  "entry": "x402://summarizeagent.eth/summarize/v1.1.0"
}
```

## Example Commercial v1.1.0 card

```json
{
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json",
  "$id": "https://commandlayer.org/agent-cards/agents/v1.1.0/commercial/checkoutagent.eth.json",
  "id": "checkoutagent.eth",
  "version": "1.1.0",
  "class": "commercial",
  "implements": ["checkout"],
  "schemas": {
    "request": "https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/checkout/checkout.request.schema.json",
    "receipt": "https://raw.githubusercontent.com/commandlayer/protocol-commercial/refs/tags/v1.1.0/schemas/v1.1.0/commercial/checkout/checkout.receipt.schema.json"
  },
  "schemas_mirror": {
    "request": "https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.1.0/commercial/checkout/checkout.receipt.schema.json"
  },
  "entry": "x402://checkoutagent.eth/checkout/v1.1.0"
}
```

## Validation

```bash
npm install
npm run validate
```

Validation checks:

- descriptor schema conformance
- exact authoritative v1.1.0 card presence
- version / path / `$schema` / `$id` alignment
- direct Commons and Commercial source URL patterns
- direct `commandlayer.org` mirror URL patterns
- entry URI correctness
- current release checksum determinism across the canonical v1.1.0 line
- archival checksum determinism for retained v1.0.0 compatibility assets
- committed dist-pin bundle mirroring and bundle-local checksum determinism

## Discovery surfaces

- `.well-known/agent.json` — current discovery pointer for the recommended release line
- `.well-known/agent-cards-v1.1.0.json` — frozen v1.1.0 discovery snapshot
- The two discovery descriptors are intentionally both present under **Model A: current pointer + versioned snapshot**.
- Validation enforces that the files are identical except for the current-pointer fields in `agent.json`: `name`, `description`, `meta.descriptor_role`, and `meta.current_pointer_target`.
- The versioned snapshot keeps the v1.1.0 release facts frozen and carries `meta.descriptor_role=release-snapshot` plus `meta.frozen_release=v1.1.0`.

## Release artifacts and integrity surfaces

- `meta/manifest.json` — authoritative release index
- `checksums-v1.1.0.txt` — canonical checksum surface for the current v1.1.0 release line
- `checksums-v1.0.0.txt` — archival checksum surface for retained v1.0.0 compatibility assets
- `dist-pin/agent-cards/v1.1.0/` — committed authoritative publish bundle; it must exactly mirror the canonical v1.1.0 files in this repo
- `dist-pin/agent-cards/v1.1.0/checksums.txt` — bundle-local checksums for the committed publish bundle
- `dist-pin/agent-cards/v1.0.0/checksums.txt` — archival bundle-local checksums for the v1.0.0 publish bundle

The clean-clone verification story is now split on purpose:

- verify the current canonical release line with `npm run validate:checksums` or by inspecting `checksums-v1.1.0.txt`
- verify the committed publish bundle independently with `dist-pin/agent-cards/v1.1.0/checksums.txt`
- verify archival compatibility assets separately with `checksums-v1.0.0.txt`

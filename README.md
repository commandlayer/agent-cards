# Agent Cards — CommandLayer

Agent Cards are CommandLayer's identity and routing layer. They bind ENS names to canonical verbs, published request/receipt schemas, and semver-pinned x402 entrypoints without redefining the semantic contract.

## Current version story

- **Current Agent Cards line:** `v1.1.0`
- **Current Commons contract line:** `v1.1.0`
- **Current Commercial contract line:** `v1.1.0`
- **Legacy line retained for compatibility:** `v1.0.0`

`v1.1.0` is the canonical line. The repository's default validation path, release bundle, discovery descriptors, and checksum coverage are all centered on `v1.1.0`. `v1.0.0` remains in-tree as an archival and compatibility line only.

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

## Validation commands

```bash
npm install
npm run validate
```

Default release-facing validation:

- `npm run validate` — validates the current canonical line (`v1.1.0`) discovery and cards, verifies release checksums, and runs typecheck
- `npm run validate:current` — validates only the current canonical discovery and cards
- `npm run validate:legacy` — validates only the preserved `v1.0.0` compatibility line
- `npm run validate:checksums` — verifies deterministic checksums for release artifacts
- `npm run validate:release` — runs the full release bundle: current line, legacy line, checksums, and typecheck

Validation checks for the current line include:

- descriptor schema conformance for the current discovery files
- exact authoritative `v1.1.0` card presence
- version / path / `$schema` / `$id` alignment
- direct Commons and Commercial source URL patterns
- direct `commandlayer.org` mirror URL patterns
- entry URI correctness
- checksum determinism across cards, schemas, meta, discovery, and dist-pin

Legacy validation is intentionally secondary. It exists to confirm preserved `v1.0.0` artifacts remain structurally readable and free of committed placeholder junk; it is not the default authority path for the repository.

## Legacy v1.0.0 status and limitations

`v1.0.0` is preserved for archival compatibility, not as the normative current model.

Readers should expect the following limitations in the legacy line:

- the schema model is `_shared`-based and looser than `v1.1.0`
- provenance-adjacent metadata may appear directly on cards, including `meta.pgp_fingerprint`
- legacy schema binding conventions differ from the flat `v1.1.0` line
- legacy cards are retained as historical artifacts, so the repository does not retrofit them into the current trust model
- broken template placeholders are removed when found, but preservation does not imply parity with current release guarantees

See `COMPLIANCE.md` for release criteria and `SECURITY_PROVENANCE.md` for the current trust anchors and the legacy PGP-field explanation.

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
├── dist-pin/agent-cards/v1.1.0/
└── checksums.txt
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

## Release artifacts

- `meta/manifest.json` — authoritative release index
- `.well-known/agent.json` — current discovery descriptor
- `.well-known/agent-cards-v1.1.0.json` — versioned descriptor
- `dist-pin/agent-cards/v1.1.0/` — publish bundle for repinning
- `checksums.txt` — deterministic artifact digests

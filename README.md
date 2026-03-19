# Agent Cards — CommandLayer

## Authority Model

- **Current line:** `v1.1.0`.
- **Root repository:** canonical source of truth for current artifacts.
- **`meta/manifest.json`:** canonical registry index for the current line.
- **`.well-known/agent.json`:** current discovery pointer.
- **`.well-known/agent-cards-v1.1.0.json`:** frozen discovery snapshot for `v1.1.0`.
- **`dist-pin/agent-cards/v1.1.0/`:** derivative release bundle generated from root artifacts for repinning only.
- **`checksums-v1.1.0.txt`:** canonical integrity surface for the current line.

If root, manifest, dist-pin, and checksums disagree, root and current checksums win.

## Current Line

`v1.1.0` is the only active release line in this repository. `v1.0.0` is archival and retained only for compatibility review.

## Current Artifact Surface

- `agents/v1.1.0/` — canonical current cards.
- `schemas/v1.1.0/` — canonical current schemas.
- `meta/manifest.json` — canonical card registry index.
- `meta/commons-agent.json` / `meta/commercial-agent.json` — current class registries.
- `.well-known/agent.json` — current pointer.
- `.well-known/agent-cards-v1.1.0.json` — frozen snapshot.
- `checksums-v1.1.0.txt` — integrity file for the current canonical surface.
- `dist-pin/agent-cards/v1.1.0/` — derivative bundle that must byte-match the current canonical surface.

## Release Rules

- Current cards are minimal bindings: identity, owner, ENS, class, status, schemas, mirrors, entry, and update timestamp.
- Manifest entries must match cards exactly for `id`, `class`, `verb`, `version`, schema URLs, mirror URLs, `entry`, and `status`.
- `.well-known/agent.json` is a pointer; `.well-known/agent-cards-v1.1.0.json` is the immutable snapshot it points to.
- `dist-pin` is not authoritative. It is validated as a derivative copy of current artifacts.
- `v1.0.0` is archival only. Do not treat it as the current protocol line.

## Validation

```bash
npm install
npm run validate
```

`npm run validate` performs the full current-line trust check:

- validates current cards against the `v1.1.0` schema
- validates the current pointer/snapshot discovery model
- cross-validates `meta/manifest.json` against every current card
- verifies `dist-pin/agent-cards/v1.1.0/` is an exact derivative bundle
- verifies `checksums-v1.1.0.txt`

Optional commands:

- `npm run validate:legacy` — archival `v1.0.0` structural checks only
- `npm run validate:checksums` — verify `checksums-v1.1.0.txt`
- `npm run validate:release` — network checks for schema URLs, mirrors, and entry URIs

## Checksums

- `checksums-v1.1.0.txt` covers `.well-known/`, `agents/v1.1.0/`, `meta/`, and `schemas/v1.1.0/`.
- `checksums-v1.0.0.txt` is archival and covers `agents/v1.0.0/` and `schemas/v1.0.0/`.
- `dist-pin` is excluded from checksum truth because it is derivative, not canonical.

## Repository Layout

```text
agent-cards/
├── agents/
│   ├── v1.0.0/            # archival only
│   └── v1.1.0/            # canonical current cards
├── schemas/
│   ├── v1.0.0/            # archival only
│   └── v1.1.0/            # canonical current schemas
├── meta/                  # canonical current registry metadata
├── .well-known/           # current pointer + frozen snapshot
├── dist-pin/              # derivative release bundles
├── checksums-v1.0.0.txt   # archival integrity file
└── checksums-v1.1.0.txt   # canonical current integrity file
```

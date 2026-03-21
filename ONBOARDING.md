# Onboarding — CommandLayer Agent Cards

## Start here

`v1.1.0` is the current line. The repository enforces one canonical publication model:

- schema bindings resolve through `https://commandlayer.org/schemas/...`
- the legacy duplicate schema field is removed
- commons cards use `https://runtime.commandlayer.org/execute`
- commercial cards use `x402://<agent>/<verb>/v1.1.0`

Canonical current-line surfaces:

- `agents/v1.1.0/`
- `schemas/v1.1.0/`
- `meta/manifest.json`
- `.well-known/`
- `checksums.txt`

Archival-only surfaces:

- `agents/v1.0.0/`
- `schemas/v1.0.0/`
- `dist-pin/agent-cards/v1.0.0/`

## Editing rules

1. Keep `$schema`, `$id`, `version`, `schemas`, and `entry` aligned.
2. Use only canonical hosted schema URLs under `commandlayer.org`.
3. Never reintroduce the legacy duplicate schema field.
4. Commons entries must stay on the runtime endpoint.
5. Commercial entries must stay on the x402 route pattern.

## Supported workflow

- `npm run generate:dist-pin`
- `node scripts/generate-checksums.mjs`
- `npm run validate`
- `npm run validate:release`

Historical scripts under `scripts/archive/` are preserved only for migration reference.

# Policy — Agent Cards

## Canonical normalization policy

- The repository publishes one schema identifier pattern: `https://commandlayer.org/schemas/...`
- Raw GitHub schema URLs are not allowed in published repo artifacts.
- the legacy duplicate schema field is removed and must not be reintroduced.
- Commons cards must use `https://runtime.commandlayer.org/execute`.
- Commercial cards must use `x402://<agent>/<verb>/v1.1.0`.

## Authority policy

- Root `v1.1.0` artifacts are canonical.
- `meta/manifest.json` is the registry index.
- `.well-known/` files are discovery pointers only.
- `dist-pin/agent-cards/v1.1.0/` is derivative, reproducible, and non-authoritative.
- `v1.0.0` remains archival-only.

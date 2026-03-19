# Onboarding — CommandLayer Agent Cards

## Start here

The repo has one current-line mental model:

- root `agents/v1.1.0/`, `meta/`, `.well-known/`, and `schemas/v1.1.0/` are canonical
- `meta/manifest.json` is the registry index
- `.well-known/` is discovery
- `checksums.txt` proves integrity
- `agents/v1.0.0/` and `schemas/v1.0.0/` are archival legacy
- `dist-pin/agent-cards/v1.1.0/` is a generated derivative publish bundle

## Clean-clone review path

1. `npm install`
2. `npm run validate`
3. inspect `meta/manifest.json`
4. inspect `agents/v1.1.0/`
5. inspect `.well-known/`
6. optionally run `npm run validate:release`

## Update flow for the current line

1. edit the canonical file under `agents/v1.1.0/`, `meta/`, `.well-known/`, or `schemas/v1.1.0/`
2. keep `$schema`, `$id`, `version`, `entry`, and schema bindings aligned
3. keep `meta/manifest.json` aligned with every current card binding
4. rebuild the derivative publish bundle with `npm run generate:dist-pin`
5. regenerate root checksums with `npm run generate:checksums`
6. run `npm run validate`
7. run `npm run validate:release` for release-scoped verification

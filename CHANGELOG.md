# Changelog

This changelog records release-line differences that are visible in the checked-in schemas, cards, discovery artifacts, and validation flow.

## [1.1.0]

### Summary

`v1.1.0` is the current release-candidate Agent Cards line and the canonical repository line under review for tagging. It replaces the older `v1.0.0` working shape with a flatter current-line structure, direct schema bindings, and release validation centered on canonical root artifacts plus a reproducible derivative publish bundle.

### Removed from the current line

- Current-line reliance on `_shared` composition or inherited card structure.
- Deprecated descriptive fields from the current `v1.1.0` card surface, including `slug`, `display_name`, `description`, `capabilities`, and `meta`.
- Migration-era assumptions that treated older descriptor-led or packaging patterns as part of the active release path.
- The stale assumption that every Agent Card entry is x402-routed.

### Structural changes

- `v1.1.0` cards are flat and live directly under `agents/v1.1.0/`.
- Current cards bind directly to tagged Commons and Commercial schema URLs plus explicit `commandlayer.org` mirror URLs.
- Commons cards now publish the canonical runtime execute entry, while commercial cards continue to publish semver-pinned x402 routes.
- Root repository artifacts are the authority surface for the current line, while `dist-pin/agent-cards/v1.1.0/` is a committed derivative bundle that must remain reproducible from the root.
- Validation for the current line includes schema/card integrity, manifest alignment, class-sensitive entry enforcement, canonical root checksum coverage, and derivative-bundle reproducibility.

### Legacy status

- `v1.0.0` remains in-tree only as an archival compatibility line.
- Legacy `v1.0.0` materials may still include broader card fields, `_shared` schema structure, and older descriptor or publication assumptions that do not apply to the `v1.1.0` authority path.
- Legacy artifacts are retained for migration review and compatibility, not as the preferred source for new integrations.
- The repository now also normalizes archived commons card data to the runtime execute entry so the repo no longer carries mixed commons execution semantics.

### Migration implications

- Treat `v1.1.0` as the authoritative repository line for current integrations and validation; publication claims still wait on release validation.
- Update tooling that expected `v1.0.0` shared schema paths, broader descriptive card fields, or older descriptor-led publication layout.
- Expect current cards to expose only the minimal binding fields required by the `v1.1.0` schema.
- Enforce `entry` by class: commons use `https://runtime.commandlayer.org/execute`, commercial uses `x402://<agent>/<verb>/v1.1.0`.
- Use the root package commands, especially `npm run validate` and `npm run validate:release`, when reviewing or publishing the current line.

## [1.0.0]

- Legacy compatibility line retained in-tree for archival and migration purposes.
- Looser schema and descriptor enforcement, including a permissive descriptor schema and a broader card field set.
- Descriptor-based and IPFS-era schema references remain part of the legacy line.

# Versioning & Deprecations

## Versioning
- **Version in path**: `/v1`.
- **Non-breaking** changes: additive only (e.g., new fields appended at the end).
- **Breaking** changes: publish `/v2` and start a deprecation process.

## Deprecations
- **Sunset period**: at least **90 days** for incompatible changes.
- `Sunset` header with retirement date, migration guide and side-by-side examples (v1→v2).
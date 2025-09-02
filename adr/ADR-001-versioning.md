# ADR-001 — Versioning & Compatibility
**Date:** 2025-09-01  

## Decision
- Versioning in **path** (`/v1`), `/v2` for breaking changes.
- Non-breaking changes: additive only (append fields; no meaning changes).

## Rationale
- Clear separation for consumers; safe evolution without surprise regressions.

## Consequences
- Deprecations announce a **Sunset** period (≥ 90 days) with migration notes.
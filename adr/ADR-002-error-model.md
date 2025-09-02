# ADR-002 — Error Model (Problem Details)
**Date:** 2025-09-01  

## Decision
- Use an RFC7807-style payload with: `type`, `title`, `status`, `code`, `detail`, `traceId`, `errors[]` (422), `meta`.

## Rationale
- Standard, predictable error shape; easy to parse and log.

## Consequences
- Clients should not rely on free-text in `detail`; use `code` and `errors[]`.
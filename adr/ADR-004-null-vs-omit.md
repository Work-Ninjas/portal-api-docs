# ADR-004 — Null vs. Omit
**Date:** 2025-09-01  

## Decision
- Prefer **omitting** fields that do not apply; use `null` only when semantically meaningful.

## Rationale
- Reduces noise; clearer optional semantics.

## Consequences
- Clients should handle missing fields gracefully.
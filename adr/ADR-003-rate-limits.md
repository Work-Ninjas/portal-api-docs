# ADR-003 — Rate Limits
**Date:** 2025-09-01  

## Decision (baseline v1)
- Per client: 420 rpm (burst 60/30s)
- Per IP: 60 rpm (burst 30/30s)
- Files endpoint: 120 rpm per client
- Daily quota: 100k req/client
- Return headers: `X-RateLimit-*`; use `Retry-After` on 429

## Rationale
- Protect capacity and storage egress; align with client experience.

## Consequences
- Limits are plan-tunable; docs must reflect current effective quotas.
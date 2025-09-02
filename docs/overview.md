# Overview

## Goal
Provide secure and stable endpoints for **Contacts**, **Jobs** and **Files** of your tenant without exposing Supabase directly.  
Edge Functions issue **temporary signed URLs** for file access.

## Principles
- **Security first**: authentication required on all endpoints.
- **Stable contracts**: additive, non-breaking evolution.
- **Explicit versioning**: version in the path (`/v1`).
- **Observability**: `X-Request-Id`, audit logs and metrics.

## Architecture (high level)
- **API layer** (Edge Functions): receives the request, validates auth, resolves `client_id`→`tenant_id`, applies rate limits and calls RPCs.
- **Tenant-aware RPCs**: accept `p_client_id`, apply filters and return paginated data.
- **Storage**: objects (documents/photos) are exposed via **short-lived signed URLs**.
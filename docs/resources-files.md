# Resources – Files (GET /v1/jobs/{jobId}/files)

## Purpose
List files associated with a job and return **temporary signed URLs** for access.

## Authorization
- Requires `Authorization: Bearer <api_key>`.

## Path parameters
- `jobId` *(uuid)*: job identifier.

## Query parameters
- `kind` *(enum, optional)*: `document | photo`
- `limit` *(int, 1–100; default 25)*
- `offset` *(int, ≥0; default 0)*
- `sort` *(enum)*: `created_at | name` (default: `created_at`)
- `dir` *(enum)*: `asc | desc` (default: `desc`)

## 200 Response
- `data[]`:
  - `id` *(uuid)*
  - `kind` *(enum: document|photo)*
  - `name` *(string)*
  - `size` *(int, bytes)*
  - `bucket` *(string)*
  - `object_path` *(string)*
  - `signed_url` *(string, read-only)*
  - `expires_at` *(datetime UTC; ~15 min)*
  - `created_at` *(datetime UTC)*
- `total`, `limit`, `offset`, `has_more`.

## Notes
- URLs **expire** and should be **regenerated** when needed.
- This endpoint has a **specific rate limit** (see “Rate Limiting”).

## Errors
- 400, 401, 403, **404** (job not found or not within tenant), 429, 5xx.
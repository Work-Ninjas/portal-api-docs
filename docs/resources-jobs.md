# Resources – Jobs (GET /v1/jobs)

## Purpose
List tenant jobs with status filtering and textual search.

## Authorization
- Requires `Authorization: Bearer <api_key>`.

## Query parameters
- `status` *(enum, optional)*:  
  `open | scheduled | in_progress | blocked | awaiting_review | completed | canceled | archived`
- `q` *(string, optional)*: search by title/key.
- `limit` *(int, 1–100; default 25)*
- `offset` *(int, ≥0; default 0)*
- `sort` *(enum)*: `status | created_at | updated_at` (default: `created_at`)
- `dir` *(enum)*: `asc | desc` (default: `desc`)

## 200 Response
- `data[]`:
  - `id` *(uuid)*
  - `title` *(string)*
  - `status` *(canonical enum)*
  - `status_reason` *(string, optional)*
  - `status_updated_at` *(datetime)*
  - `contact_id` *(uuid)*
  - `created_at`, `updated_at`
- `total`, `limit`, `offset`, `has_more`.

## Errors
- 400, 401, 403, 429, 5xx.
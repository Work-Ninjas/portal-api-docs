# Resources – Contacts (GET /v1/contacts)

## Purpose
List tenant contacts with basic and primary fields (email/phone), supporting search and sorting.

## Authorization
- Requires `Authorization: Bearer <api_key>`.

## Query parameters
- `q` *(string, optional)*: search by name, email and phone.
- `limit` *(int, 1–100; default 25)*
- `offset` *(int, ≥0; default 0)*
- `sort` *(enum)*: `full_name | created_at | updated_at` (default: `created_at`)
- `dir` *(enum)*: `asc | desc` (default: `desc`)

## 200 Response
- `data[]` (list of contacts):
  - `id` *(uuid)*
  - `full_name` *(string)*
  - `primary_email` *(string, optional)*
  - `primary_phone` *(string E.164, optional)*
  - `created_at` *(datetime UTC)*
  - `updated_at` *(datetime UTC)*
- Pagination metadata: `total`, `limit`, `offset`, `has_more`.

## Errors
- 400, 401, 403, 429, 5xx.
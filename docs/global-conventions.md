# Global Conventions

## Pagination (global)
- `limit`: integer (default **25**, max **100**).
- `offset`: integer (default **0**, ≥ 0).
- Responses include: `total`, `limit`, `offset`, `has_more`.

## Sorting
- `sort`: endpoint-specific whitelist.
- `dir`: `asc|desc` (default **desc**).
- Global default: `sort=created_at`, `dir=desc`.

## Filters
- `q`: textual search (fields documented per resource).
- Resource filters, for example:
  - `status` on Jobs
  - `kind` on Files (`document|photo`)

## Identifiers & dates
- IDs: **UUID v4** (string).
- Dates: **ISO-8601 UTC** (`created_at`, `updated_at`, `expires_at`).

## Null policy
- Prefer **omitting** fields that do not apply (instead of returning `null`), unless `null` is semantically meaningful.
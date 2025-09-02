# Style Guide (Docs & Spec)

## Documentation standards
- Unique and stable `operationId` per endpoint.
- **Descriptions required** on endpoints, parameters and responses.
- **Examples** required for 200 and common errors (401/403/404/422/429).
- `sort/dir` always as **enums** with documented defaults.
- Proper typing: avoid `any` and ambiguous formats.

## Naming conventions
- snake_case for fields; keep contracts stable despite internal changes.
- Datetimes suffixed with `*_at` (UTC ISO-8601).

## Quality
- Keep **Spectral lint** green before publishing.
- PR reviews must verify pagination/sorting/filtering consistency.
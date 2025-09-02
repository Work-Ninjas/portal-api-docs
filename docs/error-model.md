# Error Model (Problem Details)

## Base structure
All error responses follow a *Problem Details*-like payload:
- `type` (internal URI or `about:blank`)
- `title` (short text)
- `status` (HTTP code)
- `code` (stable internal code)
- `detail` (human readable message)
- `traceId` (for correlation; pairs with `X-Request-Id`)
- `errors[]` *(422 only)*: objects `{ field, message, rule }`
- `meta` (optional)

## Error catalog
- **400 Bad Request**: invalid parameters or malformed request.
- **401 Unauthorized**: missing/invalid credentials.
- **403 Forbidden**: not authorized for this resource/tenant.
- **404 Not Found**: resource does not exist or is not within the tenant (no information leakage).
- **409 Conflict**: business invariant conflict.
- **422 Unprocessable Entity**: validation errors; `errors[]` included.
- **429 Too Many Requests**: usage limits exceeded; see `Retry-After`.
- **5xx Server Error**: unhandled errors.
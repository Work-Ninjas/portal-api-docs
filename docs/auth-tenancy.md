# Auth & Tenancy

## Authentication
- **Required** on all endpoints.
- Header: `Authorization: Bearer <api_key>`.
- Recommended: include `X-Request-Id` for correlation.

## Tenancy
- The `api_key` is associated with a **client_id**.
- The `client_id` is **resolved** to a `tenant_id`.
- All queries and results are restricted to the resolved **tenant**.

## Typical error responses
- **401 Unauthorized**: missing/invalid API key.
- **403 Forbidden**: API key not authorized for the resource/tenant.
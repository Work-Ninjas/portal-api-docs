# Mocking & Testing Scenarios

## Goal
Enable integrators to validate contracts **before** the backend is available or changes.

## Suggested scenarios (by endpoint)
- **Contacts**:
  - Empty list.
  - Search by `q` with matches.
  - Pagination with `has_more=true`.
- **Contacts/{id}**:
  - Contact with multiple emails/phones.
  - Contact without `mailing_address` (field omitted).
- **Jobs**:
  - One job for each canonical `status`.
  - Combined sorting and filters.
- **Files**:
  - Mix of `document|photo`.
  - `signed_url` with near-future `expires_at`.

## Errors to test
- 401 missing token.
- 403 invalid tenant.
- 422 validation (e.g., `limit`>100).
- 429 intentional burst.
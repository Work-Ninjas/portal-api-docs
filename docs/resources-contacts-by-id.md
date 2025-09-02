# Resources – Contacts (GET /v1/contacts/{id})

## Purpose
Retrieve a contact with all emails/phones and addresses (mailing/billing).

## Authorization
- Requires `Authorization: Bearer <api_key>`.

## Path parameters
- `id` *(uuid)*: contact identifier.

## 200 Response
- `id`, `full_name`
- `emails[]`: `{ email, label?, is_primary }`
- `phones[]`: `{ phone(E.164), label?, is_primary }`
- `mailing_address` *(object, optional)*
- `billing_address` *(object, optional)*
- `created_at`, `updated_at`

## Errors
- 401, 403, **404** (not found or not within tenant), 5xx.
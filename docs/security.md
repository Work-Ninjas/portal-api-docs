# Security

## API Keys
- Rotation without downtime (up to two keys active for **7 days**).
- Immediate revocation upon compromise.
- **Never** expose your API key in public clients.

## Signed URLs (files)
- **Expiration:** **15 minutes** for both `document` and `photo` kinds.
- **Read-only** access to the signed object.
- Recommendation: **do not cache**; regenerate on expiration.

## Sensitive data (PII)
- Avoid logging PII in clear text.
- Mask emails/phone numbers in observability.
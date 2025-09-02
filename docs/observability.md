# Observability

## Correlation
- Accept `X-Request-Id` in the request and echo it in the response.
- Include `traceId` in error payloads.

## Audit
- Log minimally: `client_id`, endpoint, latency, outcome (2xx/4xx/5xx), quota consumption.
- Sensitive events (file downloads) audited with extra detail.

## PII in logs
- Avoid storing PII in clear text.
- Mask emails and phone numbers when reference is unavoidable.
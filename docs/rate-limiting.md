# Rate Limiting

## Default limits (v1)
- **Per client (`client_id`)**: **420 rpm** (burst: 60 requests / 30 s).
- **Per IP**: **60 rpm** (burst: 30 / 30 s).
- **Files (`/v1/jobs/{jobId}/files`)**: **120 rpm per client** (egress protection).
- **Daily quota** per client: **100,000 requests**.

> Notes  
> - Limits can be tuned per plan/commercial agreement.  
> - File endpoints are stricter due to cost and security considerations.

## Rate-limit headers
- `X-RateLimit-Limit` (current limit)
- `X-RateLimit-Remaining` (remaining in the window)
- `X-RateLimit-Reset` (seconds until reset)
- On 429, return **`Retry-After`**.

## Client best practices
- Implement **exponential backoff** after 429.
- Avoid bursts; prefer queues and jitter.
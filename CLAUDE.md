# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an **API-first repository** for the Portal API that contains:
- OpenAPI specifications
- API documentation (Stoplight)
- Mock definitions (Prism)
- Architecture Decision Records (ADRs)

**Important:** This repo does NOT contain backend implementation code - it defines contracts and governance only.

## Key Commands

### Linting and Validation
```bash
# Install Spectral for OpenAPI linting (if not installed)
npm install -g @stoplight/spectral-cli

# Lint OpenAPI spec - MUST pass with 0 errors before PR
spectral lint openapi/openapi.yaml
```

## Architecture and Structure

### API Design Principles
- **Versioning**: Major versions in path (`/v1`, `/v2`), minor changes are additive only
- **Authentication**: Bearer token via `Authorization: Bearer <api_key>` header
- **Tenancy**: Multi-tenant via `p_client_id` → `tenant_id` mapping
- **Error Model**: Problem Details format with `type`, `title`, `status`, `code`, `detail`, `traceId`
- **Null Policy**: Omit fields that don't apply (never send null)
- **Pagination**: Standard `limit`, `offset`, `total`, `has_more` pattern
- **Sorting**: Whitelist approach with `sort` and `dir` parameters

### Current API Scope (v1)
- **Endpoints**:
  - `GET /v1/contacts` - List contacts with pagination
  - `GET /v1/contacts/{id}` - Get single contact
  - `GET /v1/jobs` - List jobs with status filtering
  - `GET /v1/jobs/{jobId}/files` - Get job files with signed URLs

### Rate Limits (Baseline)
- Per client: 420 requests/minute (burst 60/30s)
- Per IP: 60 requests/minute (burst 30/30s)
- Files endpoint: 120 requests/minute per client
- Daily quota: 100k requests/client
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### Key Conventions
- **Signed URLs**: 15-minute expiration for file access
- **Job Statuses**: `open | scheduled | in_progress | blocked | awaiting_review | completed | canceled | archived`
- **Pagination Defaults**: limit=25 (max 100), offset=0
- **Sort Default**: `created_at` descending

## Development Workflow

### Branch Naming
- `feat/docs/*` - Documentation changes
- `feat/spec/*` - OpenAPI specification changes
- `feat/mocks/*` - Mock scenarios
- `fix/*` - Bug fixes
- `chore/ci/*` - CI/build changes

### PR Requirements
Before submitting a PR, ensure:
1. Spectral lint passes with 0 errors
2. Examples exist for 200 and common 4xx responses
3. Pagination fields are correct where applicable
4. Error responses use Problem Details format
5. CHANGELOG.md is updated
6. ADR is added if changing global standards

### Commit Convention
Use conventional commits:
- `docs(resources): add examples for GET /v1/jobs`
- `spec(contacts): add emails[] schema`
- `mocks(files): add expired signed_url scenario`

## Important Files and Locations

- `/openapi/openapi.yaml` - Main OpenAPI specification
- `/docs/` - API documentation pages (Markdown)
- `/adr/` - Architecture Decision Records
- `/.github/workflows/spectral.yml` - CI pipeline for linting
- `/scripts/` - Build and utility scripts (to be populated)

## ADRs to Review
- **ADR-001**: Versioning & compatibility policy
- **ADR-002**: Error model (Problem Details)
- **ADR-003**: Rate limiting (caps, headers, 429 behavior)
- **ADR-004**: Null vs. omit policy

## Testing and Mocking

Prism mock scenarios should cover:
- Empty lists and pagination (`has_more=true`)
- Status filtering for jobs
- Signed URL expiration scenarios
- Error responses (401, 403, 422, 429)

## Notes
- The OpenAPI spec is currently in draft state (v1.0.0-alpha)
- Stoplight documentation will be published to staging
- Backend implementation is in a separate repository
- Focus is on contract-first development to prevent breaking changes
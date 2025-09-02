# Portal API — Docs, Contracts & Mocks

**API-first repository** for the Portal: OpenAPI spec, documentation (Stoplight), mocks (Prism), and Architecture Decision Records (ADRs).  
This repo **does not** contain backend code. It defines contracts and governance so implementation can move fast without breaking clients.

> **Why a separate repo?** Different cadence from the portal/backend, safe iteration on contracts, cleaner onboarding for partners, and independent CI for docs/mocks.

---

## Status

- **Spec:** OpenAPI v1.0.0-alpha — ✅ Complete  
- **Docs:** Stoplight documentation pages — ✅ Complete  
- **Mocks:** Prism scenarios — ✅ Configured  
- **ADRs:** 001–004 — ✅ Complete

## Quick Links

- **OpenAPI Specification:** [`/openapi/openapi.yaml`](./openapi/openapi.yaml)
- **Mock Server Instructions:** [`/prism-mocks.md`](./prism-mocks.md)
- **Architecture Decision Records:** [`/adr/`](./adr/)

---

## Scope (v1)

- Endpoints (read-only):
  - `GET /v1/contacts`
  - `GET /v1/contacts/{id}`
  - `GET /v1/jobs`
  - `GET /v1/jobs/{jobId}/files`
- Tenancy via `p_client_id` → `tenant_id` (tenant-aware RPCs)
- **Auth:** `Authorization: Bearer <api_key>`
- **Signed URLs:** 15 minutes (`document` & `photo`)
- **Rate limits (baseline):**  
  - Per client: **420 rpm** (burst 60/30s)  
  - Per IP: **60 rpm** (burst 30/30s)  
  - Files endpoint: **120 rpm** per client  
  - Daily quota: **100k req/client**
- **Error model:** Problem Details (`type`, `title`, `status`, `code`, `detail`, `traceId`, `errors[]`, `meta?`)
- **Global pagination:** `limit` (default 25, max 100), `offset` (default 0), `total`, `has_more`
- **Sorting:** `sort` whitelist + `dir (asc|desc)`; default `sort=created_at&dir=desc`
- **Null policy:** **omit** fields that do not apply
- **Canonical job status (v1):** `open | scheduled | in_progress | blocked | awaiting_review | completed | canceled | archived`

---

## Repository layout

```
portal-api-docs/
├─ README.md
├─ CHANGELOG.md
├─ docs/
│  ├─ quick-start.md
│  ├─ overview.md
│  ├─ auth-tenancy.md
│  ├─ global-conventions.md
│  ├─ error-model.md
│  ├─ security.md
│  ├─ rate-limiting.md
│  ├─ resources-contacts.md
│  ├─ resources-contacts-by-id.md
│  ├─ resources-jobs.md
│  ├─ resources-files.md
│  ├─ data-models.md
│  ├─ observability.md
│  ├─ versioning-deprecations.md
│  ├─ style-guide.md
│  ├─ mocking-testing.md
│  ├─ support-sla.md
│  └─ changelog-page.md
├─ openapi/
│  ├─ openapi.yaml
│  ├─ components/
│  └─ examples/
├─ adr/
│  ├─ ADR-001-versioning.md
│  ├─ ADR-002-error-model.md
│  ├─ ADR-003-rate-limits.md
│  └─ ADR-004-null-vs-omit.md
├─ scripts/
│  └─ README.md
├─ .github/
│  ├─ PULL_REQUEST_TEMPLATE.md
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ bug_report.yml
│  │  └─ feature_request.yml
│  └─ workflows/
│     └─ spectral.yml
├─ .gitignore
└─ CODEOWNERS
```

---

## Quick start (contributors)

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd portal-api-docs
npm install -g @stoplight/spectral-cli @stoplight/prism-cli
```

### 2. Run Mock Server

```bash
# Windows
scripts\start-mock-server.bat

# Unix/Linux/Mac
./scripts/start-mock-server.sh

# Or directly with Prism
prism mock openapi/openapi.yaml
```

Mock server will be available at `http://localhost:4010`

### 3. Validate OpenAPI Spec

```bash
spectral lint openapi/openapi.yaml
```

Must return "No results with a severity of 'error' found!"

### 4. Edit Documentation

- **Docs**: pages live in `/docs` (Markdown)
- **Spec**: edit `/openapi/openapi.yaml`
- **ADRs**: architecture decisions in `/adr`

### 5. Open a PR

- Spectral lint must pass (0 errors)
- Include CHANGELOG update
- Follow branch naming conventions

---

## Roles & ownership

- **Architect / Tech Lead**: defines standards, approves contracts & ADRs.
- **Senior Dev (Claude)**: authors OpenAPI, Stoplight pages, Prism mocks; keeps Spectral green; raises ADRs when changing standards.
- **Reviewers**: enforce style guide, check examples & pagination/ordering consistency.

`CODEOWNERS` will require at least one approval from Architect or designated reviewers.

---

## Contribution workflow

**Branches**
- `feat/docs/*` — new sections/pages
- `feat/spec/*` — OpenAPI changes
- `feat/mocks/*` — Prism scenarios
- `fix/*` — corrections
- `chore/ci/*` — CI, scripts

**PR checklist (copy into description)**
- [ ] Spectral lint = 0 errors (warnings justified)
- [ ] Examples for `200` and common `4xx` present
- [ ] Pagination fields (`total`, `limit`, `offset`, `has_more`) correct
- [ ] Sorting params (`sort`, `dir`) are enums with defaults
- [ ] Error model uses Problem Details
- [ ] Rate-limit headers documented where applicable
- [ ] CHANGELOG updated
- [ ] ADR added/updated if a standard changed

**Conventional commits (recommended)**
- `docs(resources): add examples for GET /v1/jobs`
- `spec(contacts): add emails[] and phones[] schemas`
- `mocks(files): add expired signed_url scenario`
- `chore(ci): add spectral workflow`

---

## Documentation (Stoplight)

- Pages are authored in `/docs`.  
- Publish via Stoplight Elements (staging) → link in this README once live.  
- **Style guide (Spectral)**: enforce titles/descriptions, `operationId` uniqueness, enums for `sort/dir`, typed fields (no `any`), examples for success/errors.

---

## OpenAPI (v1) — authoring rules

- Version in **path**: `/v1`  
- **Schemas (components):**
  - `Contact`, `ContactEmail`, `ContactPhone`
  - `Job` (with canonical `status`, `status_reason?`, `status_updated_at`)
  - `FileAsset` (with `signed_url` & `expires_at`)  
  - `Pagination`, `Error`, `ValidationError`
- **Parameters**: global `limit`, `offset`, `sort`, `dir`, `q`; resource-specific `status`, `kind`
- **Responses**: `200` (with pagination where applies), `400/401/403/404/409/422/429/5xx`
- **Examples**: realistic and short; include edge cases (empty lists, omitted optional fields)

---

## Mocking (Prism)

> Added later with scripts; goals defined here for clarity.

**Scenarios to cover**
- Lists: empty and `has_more=true`
- Filtering: `status` (Jobs), `kind` (Files)
- `signed_url` near expiration (~15m)
- Errors: 401 (no token), 403 (tenant), 422 (validation), 429 (burst)

**Acceptance**
- Mock responses match OpenAPI examples (shape + types)
- Can flip between success & error scenarios predictably

---

## Versioning & deprecations

- **Major changes** create `/v2` routes and start a **Sunset** period (≥ 90 days)  
- Non-breaking: add fields at the end; never change meaning of existing fields  
- Provide migration notes in **Changelog** + a dedicated docs page when applicable

---

## Governance & ADRs

Short ADRs capture decisions and rationale:
- **ADR-001** Versioning & compatibility policy  
- **ADR-002** Error model (Problem Details)  
- **ADR-003** Rate limiting (caps, headers, 429 behavior)  
- **ADR-004** Null vs. omit policy

Use ADRs when proposing changes to global standards (pagination, errors, security, etc.).

---

## Security

- **Auth:** `Authorization: Bearer <api_key>` on every endpoint  
- **Signed URLs:** 15-minute expiration; read-only; do not cache  
- **PII in logs:** minimize; mask emails & phone numbers  
- **Keys:** allow rotation (two keys active up to 7 days), immediate revocation

---

## Observability

- Accept `X-Request-Id` and return it; include `traceId` in error payloads  
- Audit minimally: `client_id`, endpoint, latency, outcome, quota consumption  
- Special attention to file downloads (egress control)

---

## Rate limiting (baseline)

- Per client (`client_id`): **420 rpm** (burst 60/30s)  
- Per IP: **60 rpm** (burst 30/30s)  
- Files endpoint: **120 rpm** per client  
- Daily quota: **100k req/client**  
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`; use `Retry-After` on 429

---

## Definition of Done — Sprint 0

- Stoplight (staging) published with all pages in `/docs`  
- OpenAPI v1 draft complete with components, parameters & examples  
- Spectral lint: **0 errors**  
- Prism mocks for key scenarios up & verifiable  
- `CHANGELOG.md`: `v1.0.0-alpha` entry  
- ADR-001..004 drafted

---

## Changelog

Maintain `CHANGELOG.md` at repo root.  
First entry example:

```
v1.0.0-alpha — 2025-09-01
- Initial publication of docs structure
- OpenAPI v1 draft (Contacts, Jobs, Files)
- Problem Details error model
- Global pagination & sorting conventions
- Rate limits baseline; signed URLs set to 15 minutes
```

---

## Support

- Stakeholders: Architect (tech lead), Senior Dev (docs/spec/mocks)  
- Contact channels & SLAs are documented in `/docs/support-sla.md`

---

## Next steps

1. Paste the prepared pages into `/docs`.  
2. Hand off to Senior Dev to create OpenAPI + mocks and publish Stoplight (staging).  
3. Review via PR (Spectral green, examples complete, ADRs included).
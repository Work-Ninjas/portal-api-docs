# Quick Start

## What is this API?
A layer of **first-party APIs** (Edge Functions) that **do not expose Supabase directly**.  
Endpoints call **tenant-aware RPCs** using `p_client_id` → `tenant_id`.

## Available endpoints (v1)
- `GET /v1/contacts`
- `GET /v1/contacts/{id}`
- `GET /v1/jobs`
- `GET /v1/jobs/{jobId}/files`

## Getting started
1. Obtain your **API Key** and set the header `Authorization: Bearer <api_key>`.
2. Read **Auth & Tenancy** (how we resolve `tenant_id`).
3. Review **Global Conventions**: pagination, sorting and filters.
4. Explore each resource in **Resources**.
5. Check **Rate Limiting** and **Error Model**.
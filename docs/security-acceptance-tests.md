# Security Acceptance Tests

This document outlines the required acceptance tests to verify proper authentication and environment separation for the Portal API.

## Test Environment Setup

Before running tests, ensure the following environment configuration:

### Production Environment
- `AUTH_MODE=strict`
- `MOCK_MODE=off` 
- `ALLOW_ANON_DOCS=false`
- API endpoint: `https://api.datahubportal.com/v1`
- Only accepts tokens with prefix `dhp_live_`

### Staging Environment
- `AUTH_MODE=strict`
- `MOCK_MODE=off`
- `ALLOW_ANON_DOCS=false` 
- API endpoint: `https://api.staging.datahubportal.com/v1`
- Only accepts tokens with prefix `dhp_stg_`

### Mock Server (Dedicated)
- No authentication required
- API endpoint: `https://mock.api.datahubportal.com`
- Returns OpenAPI example data only
- CORS enabled for `https://docs.datahubportal.com`

## Required Acceptance Tests

### Test 1: Production - No Authorization Header

**Expected Result**: `401 Unauthorized` with `missing_token` code

```bash
curl -i https://api.datahubportal.com/v1/contacts?limit=1
```

**Expected Response**:
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://api.datahubportal.com/errors/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "code": "missing_token",
  "detail": "Authorization header is required",
  "traceId": "req_abc123def456"
}
```

### Test 2: Production - Invalid Token Format

**Expected Result**: `401 Unauthorized` with `invalid_token_format` code

```bash
curl -i -H "Authorization: Bearer invalid" https://api.datahubportal.com/v1/contacts?limit=1
```

**Expected Response**:
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://api.datahubportal.com/errors/unauthorized", 
  "title": "Unauthorized",
  "status": 401,
  "code": "invalid_token_format",
  "detail": "Bearer token format is invalid",
  "traceId": "req_ghi789jkl012"
}
```

### Test 3: Production - Wrong Environment Token

**Expected Result**: `401 Unauthorized` with `wrong_environment_token` code

```bash
curl -i -H "Authorization: Bearer dhp_stg_XXXX" https://api.datahubportal.com/v1/contacts?limit=1
```

**Expected Response**:
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://api.datahubportal.com/errors/unauthorized",
  "title": "Unauthorized", 
  "status": 401,
  "code": "wrong_environment_token",
  "detail": "Token environment prefix does not match server environment",
  "traceId": "req_mno345pqr678"
}
```

### Test 4: Production - Valid Live Token

**Expected Result**: `200 OK` with real tenant data and rate limit headers

```bash
curl -i -H "Authorization: Bearer <VALID_LIVE_TOKEN>" "https://api.datahubportal.com/v1/contacts?limit=1"
```

**Expected Response**:
```json
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 420
X-RateLimit-Remaining: 419
X-RateLimit-Reset: 1705745400

{
  "data": [
    {
      "id": "con_a1b2c3d4",
      "name": "Real Contact Name",
      "emails": [{"email": "real@tenant.com", "type": "work", "is_primary": true}],
      "created_at": "2024-01-20T10:30:00Z",
      "updated_at": "2024-01-20T10:30:00Z"
    }
  ],
  "total": 45,
  "limit": 1,
  "offset": 0,
  "has_more": true
}
```

### Test 5: Staging - Valid Staging Token

**Expected Result**: `200 OK` with real tenant data

```bash
curl -i -H "Authorization: Bearer <VALID_STG_TOKEN>" "https://api.staging.datahubportal.com/v1/contacts?limit=1"
```

**Expected Response**: Same format as Test 4, with staging environment data.

### Test 6: Mock Server - No Authentication

**Expected Result**: `200 OK` with OpenAPI example data

```bash
curl -i https://mock.api.datahubportal.com/v1/contacts?limit=1
```

**Expected Response**:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": "con_a1b2c3d4", 
      "name": "John Smith",
      "emails": [{"email": "john@example.com", "type": "work", "is_primary": true}],
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z"
    }
  ],
  "total": 47,
  "limit": 25,
  "offset": 0,
  "has_more": true
}
```

### Test 7: Health Endpoint Verification

**Expected Result**: `200 OK` with correct auth/mock mode indicators

```bash
# Production
curl -i https://api.datahubportal.com/v1/health

# Expected:
{
  "status": "healthy",
  "authMode": "strict", 
  "mockMode": false,
  "timestamp": "2024-01-20T10:30:00Z",
  "version": "1.0.0"
}
```

```bash
# Staging  
curl -i https://api.staging.datahubportal.com/v1/health

# Expected: Same as production but for staging environment
```

## Security Validation Checklist

- [ ] **Test 1**: Production returns `401` with `missing_token` for requests without Authorization header
- [ ] **Test 2**: Production returns `401` with `invalid_token_format` for malformed tokens  
- [ ] **Test 3**: Production returns `401` with `wrong_environment_token` for staging tokens
- [ ] **Test 4**: Production returns `200` with real data for valid `dhp_live_` tokens
- [ ] **Test 5**: Staging returns `200` with real data for valid `dhp_stg_` tokens
- [ ] **Test 6**: Mock server returns `200` with example data and no auth required
- [ ] **Test 7**: Health endpoints show correct `authMode: "strict"` and `mockMode: false`
- [ ] **Rate Limits**: Production/staging show proper `X-RateLimit-*` headers
- [ ] **No Leakage**: Production/staging NEVER return example/mock data
- [ ] **Token Security**: All token validation uses constant-time comparison
- [ ] **Logging**: No bearer tokens are logged in plaintext anywhere

## Operational Alerts

Set up monitoring alerts for:

- **Auth Bypass**: >1% of 200 responses in prod/staging without valid Authorization headers  
- **Wrong Environment**: >0.1% of requests with incorrect token prefixes returning 200
- **Mock Leakage**: Any prod/staging responses containing example data patterns
- **Health Check**: `authMode` not equal to `"strict"` or `mockMode` not equal to `false`

## Documentation Integration

Ensure `docs.datahubportal.com` implements proper server selection:

1. **No Token**: Recommend Mock Server (`https://mock.api.datahubportal.com`)
2. **Token with `dhp_live_` prefix**: Default to Production  
3. **Token with `dhp_stg_` prefix**: Default to Staging
4. **Clear Separation**: Mock server clearly marked as "no auth, example data only"
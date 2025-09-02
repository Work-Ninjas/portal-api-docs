# Prism Mock Server

## Installation

```bash
npm install -g @stoplight/prism-cli
```

## Running the Mock Server

Start the mock server with the OpenAPI specification:

```bash
prism mock openapi/openapi.yaml
```

The mock server will start on `http://localhost:4010`

## Available Mock Scenarios

### 1. List Contacts
```bash
# With contacts
curl -H "Authorization: Bearer test_token" http://localhost:4010/v1/contacts

# Empty list (use Prefer header)
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=emptyList" \
     http://localhost:4010/v1/contacts
```

### 2. Get Contact by ID
```bash
# Full contact
curl -H "Authorization: Bearer test_token" \
     http://localhost:4010/v1/contacts/con_a1b2c3d4

# Minimal contact (use Prefer header)
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=minimalContact" \
     http://localhost:4010/v1/contacts/con_e5f6g7h8
```

### 3. List Jobs
```bash
# Active jobs
curl -H "Authorization: Bearer test_token" \
     http://localhost:4010/v1/jobs

# Blocked jobs
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=blockedJobs" \
     http://localhost:4010/v1/jobs?status=blocked

# Empty job list
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=emptyJobs" \
     http://localhost:4010/v1/jobs
```

### 4. Get Job Files
```bash
# Files with signed URLs
curl -H "Authorization: Bearer test_token" \
     http://localhost:4010/v1/jobs/job_x1y2z3a4/files

# Files expiring soon
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=expiringSoon" \
     http://localhost:4010/v1/jobs/job_x1y2z3a4/files

# No files
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: example=noFiles" \
     http://localhost:4010/v1/jobs/job_x1y2z3a4/files
```

## Error Response Testing

### 401 Unauthorized
```bash
# Missing Bearer token
curl http://localhost:4010/v1/contacts
```

### 404 Not Found
```bash
curl -H "Authorization: Bearer test_token" \
     http://localhost:4010/v1/contacts/invalid_id
```

### 422 Validation Error
```bash
curl -H "Authorization: Bearer test_token" \
     http://localhost:4010/v1/jobs?status=invalid_status
```

### 429 Rate Limited
```bash
# Prism will automatically return 429 based on configured examples
curl -H "Authorization: Bearer test_token" \
     -H "Prefer: code=429" \
     http://localhost:4010/v1/contacts
```

## Dynamic Mocking

Prism can generate dynamic responses based on the OpenAPI schema:

```bash
# Start with dynamic mode
prism mock openapi/openapi.yaml --dynamic

# This will generate random but valid data according to schemas
```

## Validation Mode

To validate requests against the OpenAPI spec:

```bash
prism mock openapi/openapi.yaml --errors
```

This will return validation errors if requests don't match the specification.
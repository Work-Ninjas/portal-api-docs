# datahub-portal-api

Official Python SDK for the Portal API - Contact, job, and file management.

[![PyPI version](https://badge.fury.io/py/datahub-portal-api.svg)](https://pypi.org/project/datahub-portal-api)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Documentation](https://img.shields.io/badge/docs-live-brightgreen?style=flat&logo=book&logoColor=white)](https://docs.datahubportal.com)

## Quick Start

### Installation

```bash
pip install datahub-portal-api
# or
poetry add datahub-portal-api
```

### Basic Usage

```python
from datahub_portal_api import Configuration, ApiClient
from datahub_portal_api.api.contacts_api import ContactsApi
from datahub_portal_api.api.jobs_api import JobsApi
from datahub_portal_api.api.files_api import FilesApi

config = Configuration()
config.host = "https://api.datahubportal.com/v1"
config.access_token = "YOUR_API_KEY"  # Bearer token

with ApiClient(config) as client:
    contacts = ContactsApi(client)
    jobs = JobsApi(client)
    files = FilesApi(client)

    # List contacts with search
    resp = contacts.list_contacts(limit=25, q="john")
    print(len(resp.data.data))

    # Get specific contact
    contact = contacts.get_contact_by_id(id="con_a1b2c3d4")
    print(contact.name)

    # List jobs by status
    job_resp = jobs.list_jobs(status="in_progress", limit=5)
    print([j.status for j in job_resp.data.data])

    # Get job files
    file_resp = files.get_job_files(job_id="job_x1y2z3a4", kind="document", limit=2)
    print(file_resp.data.data[0].signed_url)
```

### Environment Setup

Create a `.env` file or set environment variables:

```bash
API_KEY=your_api_key_here
API_BASE_URL=https://api.datahubportal.com/v1
```

Use with python-dotenv:

```python
import os
from dotenv import load_dotenv
from datahub_portal_api import Configuration, ApiClient

load_dotenv()

config = Configuration()
config.host = os.getenv("API_BASE_URL", "https://api.datahubportal.com/v1")
config.access_token = os.getenv("API_KEY")
```

## API Reference

### ContactsApi

- `list_contacts(limit=None, offset=None, q=None, ...)` - List contacts with pagination and search
- `get_contact_by_id(id)` - Get contact by ID

### JobsApi

- `list_jobs(limit=None, offset=None, status=None, ...)` - List jobs with status filtering and sorting

### FilesApi

- `get_job_files(job_id, kind=None, limit=None, ...)` - Get job files with signed URLs

## Error Handling

The SDK raises `ApiException` for HTTP errors:

```python
from datahub_portal_api.rest import ApiException

try:
    contact = contacts.get_contact_by_id(id="invalid-id")
except ApiException as e:
    if e.status == 404:
        print("Contact not found")
    elif e.status == 401:
        print("Invalid API key")
    else:
        print(f"API error: {e}")
```

## Authentication

Get your API key from your DataHub Portal account:

1. Log in to [datahubportal.com](https://datahubportal.com)
2. Go to **Account Settings** → **API Access**
3. Generate a new API key
4. Store it securely in environment variables

## Rate Limiting

The API has rate limits. Check response headers for rate limit information.

## Documentation

- 📚 [API Documentation](https://docs.datahubportal.com)
- 🔧 [Interactive Playground](https://docs.datahubportal.com)
- 📝 [Getting Started Guide](https://docs.datahubportal.com/getting-started)

## Support

- 📧 Email: [api-support@datahubportal.com](mailto:api-support@datahubportal.com)
- 🐛 Issues: [GitHub Issues](https://github.com/Work-Ninjas/portal-api-docs/issues)
- 📖 Docs: [docs.datahubportal.com](https://docs.datahubportal.com)

Response time: 24 hours (business days)

## Technical Details

This SDK is built using Python and the requests library.

**Requirements:**
- Python 3.9+
- requests library
- typing-extensions (for Python < 3.10)

### Development Installation

```bash
git clone https://github.com/Work-Ninjas/portal-api-sdk-py.git
cd portal-api-sdk-py
pip install -e .
```

### Tests

```bash
pytest
```

## License

Proprietary - DataHub Portal Team

---

Generated with OpenAPI Generator v7.14.0 from Portal API v1.0.0
# SDK Quickstarts

Official SDKs for the Portal API are available for TypeScript/JavaScript and Python. These SDKs provide type-safe, easy-to-use interfaces for all API endpoints.

## TypeScript/JavaScript SDK

[![npm version](https://badge.fury.io/js/@datahubportal%2Fportal-api.svg)](https://www.npmjs.com/package/@datahubportal/portal-api)

### Installation

```bash
npm install @datahubportal/portal-api
# or
yarn add @datahubportal/portal-api
```

### Quick Start

```typescript
import { Configuration, ContactsApi, JobsApi, FilesApi } from "@datahubportal/portal-api";

const config = new Configuration({
  basePath: "https://api.datahubportal.com/v1",
  accessToken: process.env.API_KEY!, // Bearer token
});

const contacts = new ContactsApi(config);
const jobs = new JobsApi(config);
const files = new FilesApi(config);

(async () => {
  // List contacts with search
  const contactsList = await contacts.listContacts({ limit: 25, q: "john" });
  console.log(contactsList.data?.data?.length);

  // Get specific contact
  const contact = await contacts.getContactById({ id: "con_a1b2c3d4" });
  console.log(contact.data?.name);

  // List jobs by status
  const jobsList = await jobs.listJobs({ status: "in_progress", limit: 5 });
  console.log(jobsList.data?.data?.map(x => x.status));

  // Get job files
  const filesList = await files.getJobFiles({ 
    jobId: "job_x1y2z3a4", 
    kind: "document", 
    limit: 2 
  });
  console.log(filesList.data?.data?.[0]?.signed_url);
})();
```

### Error Handling

```typescript
try {
  const contact = await contacts.getContactById({ id: "invalid-id" });
} catch (error) {
  if (error.status === 404) {
    console.log("Contact not found");
  } else if (error.status === 401) {
    console.log("Invalid API key");
  } else {
    console.error("API error:", error);
  }
}
```

### Repository & Documentation

- 📦 **npm**: [@datahubportal/portal-api](https://www.npmjs.com/package/@datahubportal/portal-api)
- 🔗 **Repository**: [portal-api-sdk-ts](https://github.com/Work-Ninjas/portal-api-sdk-ts)
- 📖 **Full Documentation**: [TypeScript SDK README](https://github.com/Work-Ninjas/portal-api-sdk-ts/blob/main/README.md)

---

## Python SDK

[![PyPI version](https://badge.fury.io/py/datahub-portal-api.svg)](https://pypi.org/project/datahub-portal-api)

### Installation

```bash
pip install datahub-portal-api
# or
poetry add datahub-portal-api
```

### Quick Start

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

### Error Handling

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

### Environment Configuration

```python
import os
from dotenv import load_dotenv
from datahub_portal_api import Configuration, ApiClient

load_dotenv()

config = Configuration()
config.host = os.getenv("API_BASE_URL", "https://api.datahubportal.com/v1")
config.access_token = os.getenv("API_KEY")
```

### Repository & Documentation

- 📦 **PyPI**: [datahub-portal-api](https://pypi.org/project/datahub-portal-api)
- 🔗 **Repository**: [portal-api-sdk-py](https://github.com/Work-Ninjas/portal-api-sdk-py)
- 📖 **Full Documentation**: [Python SDK README](https://github.com/Work-Ninjas/portal-api-sdk-py/blob/main/README.md)

---

## Common Usage Patterns

### Environment Variables

For both SDKs, set up your environment variables:

```bash
# .env file
API_KEY=your_api_key_here
API_BASE_URL=https://api.datahubportal.com/v1
```

### Rate Limiting & Retries

Both SDKs handle HTTP errors, but you may want to implement retry logic:

#### TypeScript
```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < attempts - 1) {
        const retryAfter = Number(error.headers?.["retry-after"] || 1);
        await delay(retryAfter * 1000);
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}
```

#### Python
```python
import time
from datahub_portal_api.rest import ApiException

def with_retry(func, attempts=3):
    for i in range(attempts):
        try:
            return func()
        except ApiException as e:
            if e.status == 429 and i < attempts - 1:
                retry_after = int(e.headers.get("Retry-After", "1"))
                time.sleep(retry_after)
                continue
            raise
    raise Exception("Max retries exceeded")
```

### Pagination

Both SDKs support pagination through the standard `limit` and `offset` parameters:

#### TypeScript
```typescript
async function getAllContacts() {
  const allContacts = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await contacts.listContacts({ limit, offset });
    const contacts = response.data?.data || [];
    allContacts.push(...contacts);
    
    if (!response.data?.has_more) break;
    offset += limit;
  }
  
  return allContacts;
}
```

#### Python
```python
def get_all_contacts():
    all_contacts = []
    offset = 0
    limit = 100
    
    while True:
        response = contacts.list_contacts(limit=limit, offset=offset)
        contacts_data = response.data.data
        all_contacts.extend(contacts_data)
        
        if not response.data.has_more:
            break
        offset += limit
    
    return all_contacts
```

## Authentication

Both SDKs require a Bearer token for authentication. Get your API key from:

1. Log in to [datahubportal.com](https://datahubportal.com)
2. Navigate to **Account Settings** → **API Access**
3. Click **"Generate API Key"**
4. Store it securely in environment variables

## Support

- 📧 **Email**: [api-support@datahubportal.com](mailto:api-support@datahubportal.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Work-Ninjas/portal-api-docs/issues)
- 📖 **Documentation**: [docs.datahubportal.com](https://docs.datahubportal.com)

Response time: 24 hours (business days)

## Next Steps

- 🔗 Try the [Interactive Playground](https://docs.datahubportal.com)
- 📚 Read the [API Documentation](https://docs.datahubportal.com)
- 🔑 Learn about [Getting an API Key](./getting-api-key.md)
- ⚠️ Review [Error Handling](./error-model.md) best practices
- 🚦 Understand [Rate Limiting](./rate-limiting.md)
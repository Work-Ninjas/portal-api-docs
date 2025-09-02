# @datahubportal/portal-api

Official TypeScript SDK for the Portal API - Contact, job, and file management.

[![npm version](https://badge.fury.io/js/@datahubportal%2Fportal-api.svg)](https://www.npmjs.com/package/@datahubportal/portal-api)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Documentation](https://img.shields.io/badge/docs-live-brightgreen?style=flat&logo=book&logoColor=white)](https://docs.datahubportal.com)

## Quick Start

### Installation

```bash
npm install @datahubportal/portal-api
# or
yarn add @datahubportal/portal-api
```

### Basic Usage

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

### Environment Setup

Create a `.env` file in your project root:

```bash
API_KEY=your_api_key_here
API_BASE_URL=https://api.datahubportal.com/v1
```

Use in your code:

```typescript
import { Configuration } from "@datahubportal/portal-api";

const config = new Configuration({
  basePath: process.env.API_BASE_URL || "https://api.datahubportal.com/v1",
  accessToken: process.env.API_KEY,
});
```

## API Reference

### ContactsApi

- `listContacts(params)` - List contacts with pagination and search
- `getContactById({ id })` - Get contact by ID

### JobsApi  

- `listJobs(params)` - List jobs with status filtering and sorting

### FilesApi

- `getJobFiles({ jobId, ...params })` - Get job files with signed URLs

## Error Handling

The SDK throws standard HTTP errors. Handle them with try-catch:

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

## Rate Limiting

The API has rate limits. Monitor the response headers:

```typescript
const response = await contacts.listContacts({ limit: 25 });
console.log("Rate limit remaining:", response.headers["x-ratelimit-remaining"]);
```

## Authentication

Get your API key from your DataHub Portal account:

1. Log in to [datahubportal.com](https://datahubportal.com)
2. Go to **Account Settings** → **API Access**
3. Generate a new API key
4. Store it securely in environment variables

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

This SDK is built using TypeScript and the [Fetch API](https://fetch.spec.whatwg.org/).

**Environments:**
- Node.js 18+
- Modern browsers
- Webpack/Vite bundlers

**Language Support:**
- TypeScript (with full type definitions)
- JavaScript (ES6+)

**Module Systems:**
- ES6 modules (recommended)
- CommonJS

### Building

```bash
npm install
npm run build
```

## License

Proprietary - DataHub Portal Team

---

Generated with OpenAPI Generator v7.14.0 from Portal API v1.0.0

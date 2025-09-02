# Getting an API Key

The Portal API uses Bearer token authentication to secure access to all protected endpoints. Follow these steps to obtain and use your API key.

## 📋 Prerequisites

- Active account on DataHub Portal
- Administrator or API access privileges
- Valid email address for notifications

## 🔑 How to Get Your API Key

### Step 1: Access Your Account Settings
1. Log in to your DataHub Portal account at [datahubportal.com](https://datahubportal.com)
2. Navigate to **Account Settings** → **API Access**
3. Click on **"Generate API Key"**

### Step 2: Configure Key Permissions
1. **Name your key**: Enter a descriptive name (e.g., "Production Integration", "Mobile App")
2. **Set permissions**: Select the required scopes:
   - `contacts:read` - Access contact information
   - `jobs:read` - View job status and details  
   - `files:read` - Download job-related files
3. **Set expiration**: Choose key lifetime (30, 90, 365 days, or never)

### Step 3: Save Your API Key
1. Click **"Generate Key"**
2. **⚠️ Important**: Copy and securely store your key immediately
3. The key will only be shown once for security reasons

## 🔐 Using Your API Key

### Authentication Header Format
```bash
Authorization: Bearer YOUR_API_TOKEN_HERE
```

### Example API Call
```bash
curl -X GET "https://api.datahubportal.com/v1/contacts?limit=5" \
  -H "Authorization: Bearer YOUR_API_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Response with Rate Limiting
```json
{
  "data": [
    {
      "id": "con_a1b2c3d4",
      "name": "John Smith",
      "company": "Acme Corp",
      "emails": [
        {
          "email": "john@acme.com",
          "type": "work",
          "is_primary": true
        }
      ]
    }
  ],
  "pagination": {
    "limit": 5,
    "offset": 0,
    "total": 142,
    "has_more": true
  }
}
```

**Rate Limiting Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1756848307
```

## 🛡️ Security Best Practices

### ✅ Do
- Store API keys in environment variables
- Use different keys for different environments
- Rotate keys regularly (every 90 days recommended)
- Monitor key usage in your account dashboard
- Revoke unused or compromised keys immediately

### ❌ Don't
- Hard-code keys in source code
- Share keys via email or chat
- Use production keys in development
- Store keys in version control
- Log API keys in application logs

### Environment Variable Example
```bash
# .env file
PORTAL_API_KEY=your_actual_api_token_here
PORTAL_API_BASE_URL=https://api.datahubportal.com/v1
```

```javascript
// JavaScript usage
const apiKey = process.env.PORTAL_API_KEY;
const response = await fetch('https://api.datahubportal.com/v1/contacts', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});
```

## 🔄 Key Rotation

For security, rotate your API keys regularly:

1. **Generate new key** with same permissions
2. **Update applications** to use new key
3. **Test thoroughly** in staging environment
4. **Deploy to production** during maintenance window
5. **Revoke old key** after 24-48 hours

## 🆘 Troubleshooting

### 401 Unauthorized
```json
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Missing or invalid authorization header",
  "traceId": "abc123-def456-789"
}
```

**Solutions:**
- Check Bearer token format: `Authorization: Bearer TOKEN`
- Verify key hasn't expired
- Ensure key has required permissions

### 429 Too Many Requests
```json
{
  "type": "https://datatracker.ietf.org/doc/html/rfc6585#section-4",
  "title": "Too Many Requests", 
  "status": 429,
  "detail": "Rate limit exceeded. Try again later.",
  "traceId": "xyz789-uvw123-456"
}
```

**Solutions:**
- Check `X-RateLimit-Reset` header for reset time
- Implement exponential backoff retry logic
- Consider upgrading to higher rate limits

## 📞 Support

Need help with API keys?

- **Email**: [api-support@datahubportal.com](mailto:api-support@datahubportal.com)
- **Documentation**: [Report an issue](https://github.com/Work-Ninjas/portal-api-docs/issues)
- **Response Time**: 24 hours (business days)

## 📚 Next Steps

Once you have your API key:

1. ✅ Test with the [Interactive Playground](https://docs.datahubportal.com)
2. ✅ Review [Rate Limiting](./rate-limiting.md) guidelines  
3. ✅ Check [Error Handling](./error-model.md) best practices
4. ✅ Explore [Resource Documentation](./overview.md)
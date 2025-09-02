# Data Models

## Contact
- `id` *(uuid)*  
- `full_name` *(string)*  
- `emails[]` *(array of ContactEmail, optional)*  
- `phones[]` *(array of ContactPhone, optional)*  
- `mailing_address` *(object, optional)*  
- `billing_address` *(object, optional)*  
- `created_at`, `updated_at` *(datetime UTC)*

## ContactEmail
- `email` *(string)*  
- `label` *(string, optional)*  
- `is_primary` *(boolean)*

## ContactPhone
- `phone` *(string E.164)*  
- `label` *(string, optional)*  
- `is_primary` *(boolean)*

## Job
- `id` *(uuid)*  
- `title` *(string)*  
- `status` *(canonical enum)*  
- `status_reason` *(string, optional)*  
- `status_updated_at` *(datetime UTC)*  
- `contact_id` *(uuid)*  
- `created_at`, `updated_at` *(datetime UTC)*

### Canonical Job Status (v1)
- `open`  
- `scheduled`  
- `in_progress`  
- `blocked`  
- `awaiting_review`  
- `completed`  
- `canceled`  
- `archived`

## FileAsset
- `id` *(uuid)*  
- `kind` *(enum: document|photo)*  
- `name` *(string)*  
- `size` *(int, bytes)*  
- `bucket` *(string)*  
- `object_path` *(string)*  
- `signed_url` *(string)*  
- `expires_at` *(datetime UTC)*  
- `created_at` *(datetime UTC)*

## Pagination
- `total` *(int)*  
- `limit` *(int)*  
- `offset` *(int)*  
- `has_more` *(boolean)*

## Error / ValidationError
- See **Error Model (Problem Details)**.
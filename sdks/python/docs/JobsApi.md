# datahub_portal_api.JobsApi

All URIs are relative to *https://api.datahubportal.com/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**list_jobs**](JobsApi.md#list_jobs) | **GET** /v1/jobs | List jobs


# **list_jobs**
> ListJobs200Response list_jobs(limit=limit, offset=offset, sort=sort, dir=dir, q=q, status=status)

List jobs

Returns a paginated list of jobs with optional status filtering

### Example

* Bearer (APIKey) Authentication (BearerAuth):

```python
import datahub_portal_api
from datahub_portal_api.models.list_jobs200_response import ListJobs200Response
from datahub_portal_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.datahubportal.com/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = datahub_portal_api.Configuration(
    host = "https://api.datahubportal.com/v1"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (APIKey): BearerAuth
configuration = datahub_portal_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with datahub_portal_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = datahub_portal_api.JobsApi(api_client)
    limit = 25 # int | Maximum number of items to return (1-100) (optional) (default to 25)
    offset = 0 # int | Number of items to skip (optional) (default to 0)
    sort = created_at # str | Field to sort by (optional) (default to created_at)
    dir = desc # str | Sort direction (optional) (default to desc)
    q = 'smith' # str | Search query string (optional)
    status = 'in_progress' # str | Filter by job status (optional)

    try:
        # List jobs
        api_response = api_instance.list_jobs(limit=limit, offset=offset, sort=sort, dir=dir, q=q, status=status)
        print("The response of JobsApi->list_jobs:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling JobsApi->list_jobs: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**| Maximum number of items to return (1-100) | [optional] [default to 25]
 **offset** | **int**| Number of items to skip | [optional] [default to 0]
 **sort** | **str**| Field to sort by | [optional] [default to created_at]
 **dir** | **str**| Sort direction | [optional] [default to desc]
 **q** | **str**| Search query string | [optional] 
 **status** | **str**| Filter by job status | [optional] 

### Return type

[**ListJobs200Response**](ListJobs200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successfully retrieved jobs |  -  |
**400** | Bad request - Invalid parameters |  -  |
**401** | Unauthorized - Missing or invalid authentication |  -  |
**403** | Forbidden - Insufficient permissions |  -  |
**422** | Validation error - Request validation failed |  -  |
**429** | Too many requests - Rate limit exceeded |  * X-RateLimit-Limit -  <br>  * X-RateLimit-Remaining -  <br>  * X-RateLimit-Reset -  <br>  * Retry-After -  <br>  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


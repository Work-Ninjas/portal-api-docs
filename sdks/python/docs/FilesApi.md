# datahub_portal_api.FilesApi

All URIs are relative to *https://api.datahubportal.com/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_job_files**](FilesApi.md#get_job_files) | **GET** /v1/jobs/{jobId}/files | Get job files


# **get_job_files**
> GetJobFiles200Response get_job_files(job_id, limit=limit, offset=offset, kind=kind)

Get job files

Returns files associated with a job, including signed URLs for access

### Example

* Bearer (APIKey) Authentication (BearerAuth):

```python
import datahub_portal_api
from datahub_portal_api.models.get_job_files200_response import GetJobFiles200Response
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
    api_instance = datahub_portal_api.FilesApi(api_client)
    job_id = 'job_x1y2z3a4' # str | Job identifier
    limit = 25 # int | Maximum number of items to return (1-100) (optional) (default to 25)
    offset = 0 # int | Number of items to skip (optional) (default to 0)
    kind = 'photo' # str | Filter by file kind (optional)

    try:
        # Get job files
        api_response = api_instance.get_job_files(job_id, limit=limit, offset=offset, kind=kind)
        print("The response of FilesApi->get_job_files:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FilesApi->get_job_files: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **job_id** | **str**| Job identifier | 
 **limit** | **int**| Maximum number of items to return (1-100) | [optional] [default to 25]
 **offset** | **int**| Number of items to skip | [optional] [default to 0]
 **kind** | **str**| Filter by file kind | [optional] 

### Return type

[**GetJobFiles200Response**](GetJobFiles200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successfully retrieved job files |  -  |
**400** | Bad request - Invalid parameters |  -  |
**401** | Unauthorized - Missing or invalid authentication |  -  |
**403** | Forbidden - Insufficient permissions |  -  |
**404** | Not found - Resource does not exist |  -  |
**429** | Too many requests - Rate limit exceeded |  * X-RateLimit-Limit -  <br>  * X-RateLimit-Remaining -  <br>  * X-RateLimit-Reset -  <br>  * Retry-After -  <br>  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


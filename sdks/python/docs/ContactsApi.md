# datahub_portal_api.ContactsApi

All URIs are relative to *https://api.datahubportal.com/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_contact_by_id**](ContactsApi.md#get_contact_by_id) | **GET** /v1/contacts/{id} | Get contact by ID
[**list_contacts**](ContactsApi.md#list_contacts) | **GET** /v1/contacts | List contacts


# **get_contact_by_id**
> Contact get_contact_by_id(id)

Get contact by ID

Returns a single contact by its unique identifier

### Example

* Bearer (APIKey) Authentication (BearerAuth):

```python
import datahub_portal_api
from datahub_portal_api.models.contact import Contact
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
    api_instance = datahub_portal_api.ContactsApi(api_client)
    id = 'con_a1b2c3d4' # str | Contact identifier

    try:
        # Get contact by ID
        api_response = api_instance.get_contact_by_id(id)
        print("The response of ContactsApi->get_contact_by_id:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ContactsApi->get_contact_by_id: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| Contact identifier | 

### Return type

[**Contact**](Contact.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successfully retrieved contact |  -  |
**400** | Bad request - Invalid parameters |  -  |
**401** | Unauthorized - Missing or invalid authentication |  -  |
**403** | Forbidden - Insufficient permissions |  -  |
**404** | Not found - Resource does not exist |  -  |
**429** | Too many requests - Rate limit exceeded |  * X-RateLimit-Limit -  <br>  * X-RateLimit-Remaining -  <br>  * X-RateLimit-Reset -  <br>  * Retry-After -  <br>  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_contacts**
> ListContacts200Response list_contacts(limit=limit, offset=offset, sort=sort, dir=dir, q=q)

List contacts

Returns a paginated list of contacts for the authenticated tenant

### Example

* Bearer (APIKey) Authentication (BearerAuth):

```python
import datahub_portal_api
from datahub_portal_api.models.list_contacts200_response import ListContacts200Response
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
    api_instance = datahub_portal_api.ContactsApi(api_client)
    limit = 25 # int | Maximum number of items to return (1-100) (optional) (default to 25)
    offset = 0 # int | Number of items to skip (optional) (default to 0)
    sort = created_at # str | Field to sort by (optional) (default to created_at)
    dir = desc # str | Sort direction (optional) (default to desc)
    q = 'smith' # str | Search query string (optional)

    try:
        # List contacts
        api_response = api_instance.list_contacts(limit=limit, offset=offset, sort=sort, dir=dir, q=q)
        print("The response of ContactsApi->list_contacts:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ContactsApi->list_contacts: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**| Maximum number of items to return (1-100) | [optional] [default to 25]
 **offset** | **int**| Number of items to skip | [optional] [default to 0]
 **sort** | **str**| Field to sort by | [optional] [default to created_at]
 **dir** | **str**| Sort direction | [optional] [default to desc]
 **q** | **str**| Search query string | [optional] 

### Return type

[**ListContacts200Response**](ListContacts200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successfully retrieved contacts |  * X-RateLimit-Limit -  <br>  * X-RateLimit-Remaining -  <br>  * X-RateLimit-Reset -  <br>  |
**400** | Bad request - Invalid parameters |  -  |
**401** | Unauthorized - Missing or invalid authentication |  -  |
**403** | Forbidden - Insufficient permissions |  -  |
**429** | Too many requests - Rate limit exceeded |  * X-RateLimit-Limit -  <br>  * X-RateLimit-Remaining -  <br>  * X-RateLimit-Reset -  <br>  * Retry-After -  <br>  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


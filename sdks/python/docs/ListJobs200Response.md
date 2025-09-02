# ListJobs200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **int** | Total number of items available | 
**limit** | **int** | Maximum items returned | 
**offset** | **int** | Number of items skipped | 
**has_more** | **bool** | Whether more items exist | 
**data** | [**List[Job]**](Job.md) |  | [optional] 

## Example

```python
from datahub_portal_api.models.list_jobs200_response import ListJobs200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ListJobs200Response from a JSON string
list_jobs200_response_instance = ListJobs200Response.from_json(json)
# print the JSON string representation of the object
print(ListJobs200Response.to_json())

# convert the object into a dict
list_jobs200_response_dict = list_jobs200_response_instance.to_dict()
# create an instance of ListJobs200Response from a dict
list_jobs200_response_from_dict = ListJobs200Response.from_dict(list_jobs200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



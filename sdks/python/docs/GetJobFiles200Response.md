# GetJobFiles200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **int** | Total number of items available | 
**limit** | **int** | Maximum items returned | 
**offset** | **int** | Number of items skipped | 
**has_more** | **bool** | Whether more items exist | 
**data** | [**List[FileAsset]**](FileAsset.md) |  | [optional] 

## Example

```python
from datahub_portal_api.models.get_job_files200_response import GetJobFiles200Response

# TODO update the JSON string below
json = "{}"
# create an instance of GetJobFiles200Response from a JSON string
get_job_files200_response_instance = GetJobFiles200Response.from_json(json)
# print the JSON string representation of the object
print(GetJobFiles200Response.to_json())

# convert the object into a dict
get_job_files200_response_dict = get_job_files200_response_instance.to_dict()
# create an instance of GetJobFiles200Response from a dict
get_job_files200_response_from_dict = GetJobFiles200Response.from_dict(get_job_files200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



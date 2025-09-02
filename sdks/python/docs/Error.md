# Error


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** | URI reference for error type | 
**title** | **str** | Short error description | 
**status** | **int** | HTTP status code | 
**code** | **str** | Application-specific error code | 
**detail** | **str** | Detailed error message | 
**trace_id** | **str** | Request trace identifier for debugging | 
**errors** | [**List[ValidationError]**](ValidationError.md) | Field-specific validation errors | [optional] 

## Example

```python
from datahub_portal_api.models.error import Error

# TODO update the JSON string below
json = "{}"
# create an instance of Error from a JSON string
error_instance = Error.from_json(json)
# print the JSON string representation of the object
print(Error.to_json())

# convert the object into a dict
error_dict = error_instance.to_dict()
# create an instance of Error from a dict
error_from_dict = Error.from_dict(error_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



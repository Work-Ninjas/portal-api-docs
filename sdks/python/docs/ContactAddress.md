# ContactAddress


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**street** | **str** |  | [optional] 
**city** | **str** |  | [optional] 
**state** | **str** |  | [optional] 
**postal_code** | **str** |  | [optional] 
**country** | **str** |  | [optional] 

## Example

```python
from datahub_portal_api.models.contact_address import ContactAddress

# TODO update the JSON string below
json = "{}"
# create an instance of ContactAddress from a JSON string
contact_address_instance = ContactAddress.from_json(json)
# print the JSON string representation of the object
print(ContactAddress.to_json())

# convert the object into a dict
contact_address_dict = contact_address_instance.to_dict()
# create an instance of ContactAddress from a dict
contact_address_from_dict = ContactAddress.from_dict(contact_address_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



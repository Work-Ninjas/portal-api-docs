# ContactPhone


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**phone** | **str** | E.164 format | 
**type** | **str** |  | 
**is_primary** | **bool** |  | 

## Example

```python
from datahub_portal_api.models.contact_phone import ContactPhone

# TODO update the JSON string below
json = "{}"
# create an instance of ContactPhone from a JSON string
contact_phone_instance = ContactPhone.from_json(json)
# print the JSON string representation of the object
print(ContactPhone.to_json())

# convert the object into a dict
contact_phone_dict = contact_phone_instance.to_dict()
# create an instance of ContactPhone from a dict
contact_phone_from_dict = ContactPhone.from_dict(contact_phone_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



# ContactEmail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  | 
**type** | **str** |  | 
**is_primary** | **bool** |  | 

## Example

```python
from datahub_portal_api.models.contact_email import ContactEmail

# TODO update the JSON string below
json = "{}"
# create an instance of ContactEmail from a JSON string
contact_email_instance = ContactEmail.from_json(json)
# print the JSON string representation of the object
print(ContactEmail.to_json())

# convert the object into a dict
contact_email_dict = contact_email_instance.to_dict()
# create an instance of ContactEmail from a dict
contact_email_from_dict = ContactEmail.from_dict(contact_email_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



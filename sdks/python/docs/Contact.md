# Contact


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Unique contact identifier | 
**name** | **str** | Full name of the contact | 
**company** | **str** | Company or organization name | [optional] 
**emails** | [**List[ContactEmail]**](ContactEmail.md) |  | 
**phones** | [**List[ContactPhone]**](ContactPhone.md) |  | [optional] 
**address** | [**ContactAddress**](ContactAddress.md) |  | [optional] 
**tags** | **List[str]** |  | [optional] 
**created_at** | **datetime** | ISO 8601 timestamp | 
**updated_at** | **datetime** | ISO 8601 timestamp | 

## Example

```python
from datahub_portal_api.models.contact import Contact

# TODO update the JSON string below
json = "{}"
# create an instance of Contact from a JSON string
contact_instance = Contact.from_json(json)
# print the JSON string representation of the object
print(Contact.to_json())

# convert the object into a dict
contact_dict = contact_instance.to_dict()
# create an instance of Contact from a dict
contact_from_dict = Contact.from_dict(contact_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



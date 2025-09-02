# FileAsset


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Unique file identifier | 
**name** | **str** | Original filename | 
**kind** | [**FileKind**](FileKind.md) |  | 
**size** | **int** | File size in bytes | 
**mime_type** | **str** | MIME type | 
**signed_url** | **str** | Temporary signed URL for file access | 
**expires_at** | **datetime** | When the signed URL expires (typically 15 minutes) | 
**metadata** | **Dict[str, object]** | Optional file metadata | [optional] 
**created_at** | **datetime** |  | 

## Example

```python
from datahub_portal_api.models.file_asset import FileAsset

# TODO update the JSON string below
json = "{}"
# create an instance of FileAsset from a JSON string
file_asset_instance = FileAsset.from_json(json)
# print the JSON string representation of the object
print(FileAsset.to_json())

# convert the object into a dict
file_asset_dict = file_asset_instance.to_dict()
# create an instance of FileAsset from a dict
file_asset_from_dict = FileAsset.from_dict(file_asset_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



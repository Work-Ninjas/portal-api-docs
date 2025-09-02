# Job


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Unique job identifier | 
**title** | **str** | Job title or description | 
**status** | [**JobStatus**](JobStatus.md) |  | 
**status_reason** | **str** | Optional reason for status (especially for blocked) | [optional] 
**status_updated_at** | **datetime** | When status last changed | 
**priority** | **str** |  | 
**contact_id** | **str** | Associated contact ID | 
**scheduled_start** | **datetime** | Scheduled start time | [optional] 
**scheduled_end** | **datetime** | Scheduled end time | [optional] 
**assignee_ids** | **List[str]** |  | [optional] 
**tags** | **List[str]** |  | [optional] 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | 

## Example

```python
from datahub_portal_api.models.job import Job

# TODO update the JSON string below
json = "{}"
# create an instance of Job from a JSON string
job_instance = Job.from_json(json)
# print the JSON string representation of the object
print(Job.to_json())

# convert the object into a dict
job_dict = job_instance.to_dict()
# create an instance of Job from a dict
job_from_dict = Job.from_dict(job_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



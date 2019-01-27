Notification service
====================
**Version:** 0.0.1

### /notifications/preferences
---
##### ***GET***
**Description:** Read the current user's notification preferences.

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [Preferences](#preferences) |

##### ***PUT***
**Description:** Update the current user's notification preferences.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | The updated preferences. | Yes | [Preferences](#preferences) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [Preferences](#preferences) |
| 400 | Bad request: malformed body. |  |

### /notifications/preferences/push-subscription
---
##### ***PUT***
**Description:** Update the current user's push subscription.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | The push subscription information from the Web Push API. | Yes | object |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [Preferences](#preferences) |

##### ***DELETE***
**Description:** Remove the current user's push subscription.

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [Preferences](#preferences) |

### Models
---

### Preferences  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| emailAddress | string | The email where to send notifications for the current user. | No |
| email | [Flags](#flags) |  | No |
| push | [Flags](#flags) |  | No |

### Flags  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| questionAnswered | boolean | Enablement flag for 'Question Answered' notifications. | No |
| questionUpdated | boolean | Enablement flag for 'Question Updated' notifications. | No |
| answerUpdated | boolean | Enablement flag for 'Answer Updated' notifications. | No |
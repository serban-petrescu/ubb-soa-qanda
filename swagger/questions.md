Questions service
=================
**Version:** 0.0.1

### /questions
---
##### ***GET***
**Description:** Read an page of question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| skip | query | The number of questions to skip. | No | integer |
| limit | query | The max number of questions to return. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [QuestionPage](#questionpage) |

##### ***POST***
**Description:** Ask a new question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | The new question. | Yes | [InboundQuestion](#inboundquestion) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullQuestion](#fullquestion) |
| 400 | Bad request: malformed body, missing parameters. |  |

### /questions/{id}
---
##### ***GET***
**Description:** Read an existing question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The ID of the question to be updated. | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullQuestion](#fullquestion) |
| 400 | Bad request: malformed body, missing parameters. |  |
| 404 | Not found: no question matches the given ID. |  |

##### ***PUT***
**Description:** Update an existing question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The ID of the question to be updated. | Yes | string |
| payload | body | The updated question. | Yes | [InboundQuestion](#inboundquestion) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullQuestion](#fullquestion) |
| 400 | Bad request: malformed body, missing parameters. |  |
| 401 | Not authorized: the current user is not the same as the question's author. |  |
| 404 | Not found: no question matches the given ID. |  |

### /questions/{questionId}/answers
---
##### ***POST***
**Description:** Answer an existing question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | The ID of the question to be answered. | Yes | string |
| payload | body | The answer. | Yes | [InboundAnswer](#inboundanswer) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullAnswer](#fullanswer) |
| 400 | Bad request: malformed body, missing parameters. |  |
| 404 | Not found: no question matches the given ID. |  |

### /questions/{questionId}/answers/{answerId}
---
##### ***PUT***
**Description:** Update an answer to a question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | The ID of the question. | Yes | string |
| answerId | path | The ID of the answer to be updated. | Yes | string |
| payload | body | The answer. | Yes | [InboundAnswer](#inboundanswer) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullAnswer](#fullanswer) |
| 400 | Bad request: malformed body, missing parameters. |  |
| 401 | Not authorized: the current user is not the same as the answers's author. |  |
| 404 | Not found: no question or answer matches the given ID. |  |

### /questions/{questionId}/answers/{answerId}/vote
---
##### ***POST***
**Description:** Vote an answer to a question. If a vote already exists, it is replaced.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | The ID of the question. | Yes | string |
| answerId | path | The ID of the answer to be votes. | Yes | string |
| payload | body | The vote. | Yes | [InboundVote](#inboundvote) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullAnswer](#fullanswer) |
| 400 | Bad request: malformed body, missing parameters. |  |
| 404 | Not found: no question or answer matches the given ID. |  |

##### ***DELETE***
**Description:** Remove the vote for answer to a question.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | The ID of the question. | Yes | string |
| answerId | path | The ID of the answer to be votes. | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [FullAnswer](#fullanswer) |
| 404 | Not found: no question or answer matches the given ID. |  |

### Models
---

### InboundQuestion  

A new or updated question.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | The title of the question. | No |
| text | string | The body of the question. May include simple HTML markup. | No |

### InboundAnswer  

A new or updated answer.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| text | string | The body of the answer. May include simple HTML markup. | No |

### FullQuestion  

A question with the full details.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | The ID of the question. | No |
| userId | string | The author of the question. | No |
| createdAt | string | The date and time at which the question was created. | No |
| title | string | The title of the question. | No |
| text | string | The body of the question. May include simple HTML markup. | No |
| answers | [ [FullAnswer](#fullanswer) ] |  | No |

### QuestionPage  

A page of questions.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| QuestionPage | array | A page of questions. |  |

### PartialQuestion  

A question with the a subset of details.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | The ID of the question. | No |
| userId | string | The author of the question. | No |
| createdAt | string | The date and time at which the question was created. | No |
| title | string | The title of the question. | No |

### FullAnswer  

An answer with the full details.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | The ID of the answer. | No |
| userId | string | The author of the answer. | No |
| createdAt | string | The date and time at which the answer was created. | No |
| text | string | The body of the answer. May include simple HTML markup. | No |
| votes | [ [Vote](#vote) ] |  | No |

### InboundVote  

A new vote for an answer.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| positive | boolean | Flag indicating if the vote is positive. | No |

### Vote  

A vote for an answer.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| userId | string | The author of the vote. | No |
| positive | boolean | Flag indicating if the vote was positive. | No |
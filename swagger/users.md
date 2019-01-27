Users service
=============
**Version:** 0.0.1

### /users
---
##### ***POST***
**Description:** Register a new (inactive user). Triggers a registration email upon success.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | The user to be registered. | Yes | [InboundUser](#inbounduser) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 204 | Successful operation. |
| 400 | Bad request: malformed body, invalid username, already used username. |

### /users/activate
---
##### ***POST***
**Description:** Activate an user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | The activation token. | Yes | [ActivationToken](#activationtoken) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 204 | Successful operation. |
| 400 | Bad request: malformed body, missing token. |
| 404 | No user was found for the given token. |

### /oauth/token
---
##### ***POST***
**Description:** Authenticate an user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | formData | The user's username (email). | No | string |
| password | formData | The user's password. | No | string |
| grant_type | formData | The OAuth grant type (just 'password' is supported for now). | No | string |
| authorization | header | Basic HTTP authorization containing the client ID and client secret. | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation. | [OAuthToken](#oauthtoken) |
| 400 | Bad request: malformed body, missing properties. |  |
| 401 | Invalid client credentials. |  |
| 404 | No user was found matching the criteria. |  |

### Models
---

### InboundUser  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string | The user's username (email). | No |
| password | string | The user's password. | No |

### ActivationToken  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string | The activation UUID sent via the registration email. | No |

### OAuthToken  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| access_token | string | The generated JWT token. | No |
| token_type | string | The type of the generated token. | No |
| expires_in | integer | The number of seconds until the JWT expires. | No |
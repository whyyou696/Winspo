# WinSpo Documentation

## Models

### 1.User

- POST /register
- POST /login
- POST /google-login

## 1. User Endpoint

### * POST /register

_Request

- body

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
   "message": "Email And Password Are Required" 
}
```

### * POST /login

_Request

- body

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

_Response (401 - Unauthorized)

```json
{
    "message": "Invalid Email Or Password"
}
```

### * POST /google-login

_Response (200 - OK)

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

## Global Error

_Response (500 - Internal Server Error)

```json
{
    "message": "Internal Server Error"
}
```
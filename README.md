
#CRUD_APP

Simple Node JS MySQL CRUD API. image upload and update record. file upload with multer module.


## Authors

- [@nayanwebdev](https://www.github.com/nayanwebdev)

## Tech Stack
```bash
Node Express MySQL
```

## API Reference

#### add users

```http
  POST/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get all users

```http
  GET/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Single user

```http
  GET/user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Delete user
```http
  DELETE/user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update user
```http
  PATCH/user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_NAME`
`HOST`
`USER`
`PASSWORD`
`DB_PORT`

## environment variable
Install dependencies
```bash
  npm install
```
Start the server
```bash
  npm Start

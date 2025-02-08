# ZenData API

A lightweight API for managing file storage with bucket-based persistence.

## Stack

- **Cloud Storage:** [Cloudflare R2 Storage](https://www.cloudflare.com/products/r2/)
- **API Framework:** [Hono](https://hono.dev/)
- **Deployment Platform:** [Cloudflare Workers](https://workers.cloudflare.com/)

## Endpoints

### PUT /v1/upload/:folder

Uploads a file to a specified folder.

**Authentication:** Requires a Bearer token in the Authorization header.

**Request:**

- Route parameter: `folder` – the folder name.
- Body: raw file data, any text or binary data.

**Response Example:**

```json
{
  "error": false,
  "code": 200,
  "data": {
    "key": "generated-file-key",
    "url": "https://example.com/file-url",
    "size": 12345,
    "uploaded": "2025-01-01T00:00:00Z",
    "checksums": {
      "md5": "md5_checksum",
      "sha256": "sha256_checksum"
    },
    "metadata": {
      "contentType": "application/octet-stream",
      "storageClass": "Standard"
    }
  }
}
```

### GET /v1/file/:folder/:key

Retrieves a file from a specified folder.

**Authentication:** No authentication required.

**Request:**

- Route parameters: `folder` – the folder name, `key` – generated file key.

**Response Example:**

```json
{
  "error": false,
  "code": 200,
  "data": {
    "key": "file-key",
    "url": "https://example.com/file-url",
    "size": 12345,
    "uploaded": "2025-01-01T00:00:00Z",
    "checksums": {
      "md5": "md5_checksum",
      "sha256": "sha256_checksum"
    },
    "metadata": {
      "contentType": "application/octet-stream",
      "storageClass": "Standard"
    }
  }
}
```

### DELETE /v1/file/:folder/:key

Deletes a file from a specified folder.

**Authentication:** Requires a Bearer token in the Authorization header.

**Request:**

- Route parameters: `folder` – the folder name, `key` – generated file key.

**Response Example:**

```json
{
  "error": false,
  "code": 200,
  "data": "File deleted successfully"
}
```

### GET /v1/health

Check the health of the API

**Response Example:**

```json
{
  "error": false,
  "code": 200,
  "data": "API is healthy"
}
```

### Error Responses

#### Bad Request (400)

```json
{
  "error": true,
  "code": 400,
  "data": "Invalid request"
}
```

#### Server Error (500)

```json
{
  "error": true,
  "code": 500,
  "data": "An error occurred while processing the request"
}
```

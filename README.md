# Task API (Node.js)

A simple Task API built with Node.js and TypeScript.
Implements basic CRUD operations with in-memory storage and Bearer token authentication.

---

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variable

```bash
export API_TOKEN=secret
```

(Windows)

```bash
set API_TOKEN=secret
```

### 3. Run locally

For express
```bash
npm run dev
```
Or
For serverless
```bash
npm run offline
```

Server will start at:

```
http://localhost:3000
```

### 4. Run Unit Test

```
npm run test
```

---

## 🧪 Example curl commands

### Health check

```bash
curl http://localhost:3000/health
```

---

### Create task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer secret" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

---

### Get all tasks

```bash
curl http://localhost:3000/tasks \
  -H "Authorization: Bearer secret"
```

---

### Update task

```bash
curl -X PATCH http://localhost:3000/tasks/<id> \
  -H "Authorization: Bearer secret" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

---

## 🔐 Authentication

All `/tasks` endpoints require:

```
Authorization: Bearer <token>
```

The token is loaded from environment variable:

```
API_TOKEN
```

---

## 🧠 Assumptions

* In-memory storage only (data resets when server restarts)
* Single static API token for authentication
* Task IDs are generated using `crypto.randomUUID()`

---

## 🧱 Project Structure

```
src/
  handlers/     # Lambda-style handlers
  libs/          # utilities (auth, store, response)
  router.ts     # route dispatcher
  server.ts     # local Express server (for testing)
```

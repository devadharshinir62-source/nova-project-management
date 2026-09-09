# NOVA API Documentation

All endpoints are served under `/api`.
Authentication uses **NextAuth v4** with a credentials provider and JWT sessions.
Protected routes require a valid session cookie (`next-auth.session-token`).

---

## Authentication

### POST `/api/auth/register`
- **Public**
- **Body**: `{ "name": "string", "email": "string", "password": "string" }`
- **Success**: `201 Created` → `{ "id": "uuid", "name": "...", "email": "...", "role": "DEVELOPER" }`
- **Errors**:
  - `400 Bad Request` – missing/invalid fields.
  - `409 Conflict` – email already exists.

### POST `/api/auth/signin/credentials`
- **Public** (used by the NextAuth credentials provider)
- **Body**: `{ "email": "string", "password": "string" }`
- **Success**: `200 OK` with `Set‑Cookie` header containing JWT session.
- **Errors**: `401 Unauthorized` – invalid credentials.

### POST `/api/auth/signout`
- **Protected**
- Clears the session cookie. (NextAuth handles automatically.)

---

## Users

### GET `/api/users`
- **Protected**
- Returns list of users **without** password/hash.
```json
[
  { "id": "uuid", "name": "Alice", "email": "alice@example.com", "role": "DEVELOPER" },
  ...
]
```
- **Errors**: `401 Unauthorized` if not logged in.

---

## Projects

| Method | Endpoint | Auth | Body / Params | Success | Errors |
|--------|----------|------|---------------|---------|--------|
| GET | `/api/projects` | ✅ | – | `200` → array of projects | `401` |
| POST | `/api/projects` | ✅ | `{ "name": "string", "description?": "string", "status?": "ACTIVE|COMPLETED|PAUSED" }` | `201` → created project | `400` (validation) |
| GET | `/api/projects/:id` | ✅ | `:id` path | `200` → project object | `401`, `404` |
| PUT | `/api/projects/:id` | ✅ | Partial update fields | `200` → updated project | `400`, `404` |
| DELETE | `/api/projects/:id` | ✅ | – | `204` (or `200` with message) | `401`, `404`, `409` if protected against deletion of projects with related tasks/members |

---

## Tasks

| Method | Endpoint | Auth | Body / Params | Success | Errors |
|--------|----------|------|---------------|---------|--------|
| GET | `/api/tasks` | ✅ | – | `200` → array of tasks (includes project & assignee info) | `401` |
| POST | `/api/tasks` | ✅ | `{ "title": "string", "projectId": "uuid", "description?": "string", "status?": "TODO|IN_PROGRESS|COMPLETED", "priority?": "LOW|MEDIUM|HIGH", "dueDate?": "ISO date", "assigneeId?": "uuid" }` | `201` → created task | `400` (missing title/projectId, invalid enums) |
| GET | `/api/tasks/:id` | ✅ | `:id` | `200` → task object | `401`, `404` |
| PUT | `/api/tasks/:id` | ✅ | Partial update fields (same shape as POST) | `200` → updated task | `400`, `404` |
| DELETE | `/api/tasks/:id` | ✅ | – | `204` (or `200`) | `401`, `404` |

---

## Project Members

| Method | Endpoint | Auth | Body / Params | Success | Errors |
|--------|----------|------|---------------|---------|--------|
| GET | `/api/projects/:id/members` | ✅ | `:id` | `200` → array of members | `401`, `404` |
| POST | `/api/projects/:id/members` | ✅ | `{ "userId": "uuid" }` | `201` → created membership | `400`, `404` (project or user), `409` (duplicate) |
| DELETE | `/api/projects/:id/members/:userId` | ✅ | `:id`, `:userId` | `204` | `401`, `404` |

---

## Dashboard

### GET `/api/dashboard`
- **Protected**
- Returns aggregated statistics and recent items.
```json
{
  "stats": {
    "totalProjects": number,
    "activeProjects": number,
    "completedProjects": number,
    "pausedProjects": number,
    "totalTasks": number,
    "todoTasks": number,
    "inProgressTasks": number,
    "completedTasks": number,
    "totalTeamMembers": number
  },
  "projects": [ /* up to 5 most recent */ ],
  "recentTasks": [ /* up to 5 most recent */ ]
}
```
- **Errors**: `401 Unauthorized` when not logged in.

---

## General Error Format
All error responses are JSON:
```json
{ "error": "Brief description of the problem." }
```
No stack traces, passwords, or secrets are ever included.

---

## Notes
- All endpoints use **Prisma** for data access; no schema migrations were performed during testing.
- Passwords are stored with **bcryptjs** and never returned.
- The `AUTH_SECRET` and `DATABASE_URL` remain hidden; they are read from `.env` only.
- No mock data is used; every response reflects the real PostgreSQL database state.

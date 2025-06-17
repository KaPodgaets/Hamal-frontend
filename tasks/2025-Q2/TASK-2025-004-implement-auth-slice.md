---
id: TASK-2025-004
title: "Implement Redux Auth Slice and Login Thunk"
status: backlog
priority: high
type: feature
estimate: 5h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-frontend-app, ARCH-service-hamal-api]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

Create a Redux Toolkit slice (`authSlice`) to manage the application's authentication state, including the user's token and role. Implement an async thunk for handling the login process.

## Acceptance Criteria

- `authSlice.ts` is created. Its state includes `token: string | null` and `role: number | null`.
- The slice handles actions for setting auth data on successful login and clearing it on logout.
- An async thunk `loginThunk` is created to handle the `POST /api/Auth/login` request.
- On a successful API response (200 OK), the thunk dispatches an action to store the received token and role in the Redux state and `localStorage`.
- The Redux store is configured to use this slice.

## Definition of Done

- The `authSlice` correctly manages authentication state.
- `loginThunk` successfully authenticates the user and persists the auth state.

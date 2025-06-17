---
id: TASK-2025-003
title: "Implement Centralized API Service with Axios"
status: done
priority: high
type: feature
estimate: 4h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-frontend-app, ARCH-service-hamal-api]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - API service created with interceptors"}
---

## Description

Create a centralized API service module using `axios`. This module will manage all communication with the backend API, including automatic handling of authentication tokens and `401 Unauthorized` errors.

## Acceptance Criteria

- An `axios` instance is created with the base URL for the API.
- A request interceptor is implemented to attach the JWT token from the Redux store to the `Authorization` header of every outgoing request.
- A response interceptor is implemented to catch `401 Unauthorized` responses. On a 401 error, it should dispatch an action to log the user out and redirect them to the login page.

## Definition of Done

- The API service module is created and can be used by Redux thunks to make authenticated requests.
- The `401` error handling is functional and redirects the user as expected.

---
id: TASK-2025-008
title: "Implement Citizen State Management (citizensSlice)"
status: backlog
priority: medium
type: feature
estimate: 4h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
parents: [TASK-2025-007]
arch_refs: [ARCH-frontend-app, ARCH-service-hamal-api]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

Create a Redux Toolkit slice (`citizensSlice`) to manage the state for the current citizen being processed and to track if the queue is empty.

## Acceptance Criteria

- A `citizensSlice.ts` is created with state for `currentCitizen: CitizenResponse | null` and `queueIsEmpty: boolean`.
- An async thunk for `GET /api/Citizens/next` is implemented.
- If the API response status is `200 OK`, the thunk sets `currentCitizen` to the response data and `queueIsEmpty` to `false`.
- If the API response status is `204 No Content`, the thunk sets `currentCitizen` to `null` and `queueIsEmpty` to `true`.
- An async thunk for `PUT /api/Citizens/{id}` is implemented to submit form updates. It should expect a `200 OK` on success.

## Definition of Done

- The `citizensSlice` is integrated into the Redux store.
- The thunks correctly interact with the API and update the state based on response codes.

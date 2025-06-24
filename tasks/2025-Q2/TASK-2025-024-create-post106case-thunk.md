---
id: TASK-2025-024
title: "Create post106CaseThunk in citizensSlice"
status: completed
priority: high
type: feature
estimate: 3h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-020]
arch_refs: [ARCH-app-case-escalation-workflow, ARCH-service-hamal-api]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - Implemented post106CaseThunk and updated extraReducers"}
---

## Description

Create an async thunk in `src/store/slices/citizensSlice.ts` to encapsulate the logic for making the `POST /citizen/106-case` API call. This keeps API logic consistent and managed within Redux.

## Acceptance Criteria

- A new `createAsyncThunk` named `post106CaseThunk` is implemented.
- It accepts an object `{ id: number, caseNumber: string }` as its payload.
- It calls `api.post('/citizen/106-case', payload)`.
- The `extraReducers` in `citizensSlice` are updated to handle its lifecycle:
  - On pending, `loading` is set to true.
  - On fulfilled, `loading` is set to false and `currentCitizen` is cleared.
  - On rejected, `loading` is set to false and the `error` state field is populated.

## Definition of Done

- post106CaseThunk is implemented and integrated into citizensSlice.

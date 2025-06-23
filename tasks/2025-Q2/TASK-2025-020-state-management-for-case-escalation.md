---
id: TASK-2025-020
title: "Phase 1: State Management for Case Escalation"
status: backlog
priority: high
type: feature
estimate: 5h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-019]
children: [TASK-2025-023, TASK-2025-024]
arch_refs: [ARCH-app-case-escalation-workflow, ARCH-frontend-app]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

This task involves aligning the frontend data models with the API schema and creating the necessary Redux actions and state management logic for the new case escalation endpoint.

## Acceptance Criteria

- The `CitizenResponse` interface in `citizensSlice.ts` matches the new API specification.
- A new async thunk, `post106CaseThunk`, is created to handle the `POST /citizen/106-case` API call.
- The `citizensSlice` extra reducers are updated to handle the pending, fulfilled, and rejected states of `post106CaseThunk`, including loading and error state management.

## Definition of Done

- All child tasks (`TASK-2025-023`, `TASK-2025-024`) are completed.

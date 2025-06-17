---
id: TASK-2025-016
title: "Refactor Citizens Slice"
status: done
priority: high
type: refactor
estimate: 4h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-frontend-app]
parents: [TASK-2025-015]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - Citizens slice updated with new API schema interfaces"}

---

## Description

Refactor the Redux state management for citizens in `src/store/slices/citizensSlice.ts` to align with the new, authoritative API contract. Update the data models and ensure proper integration with the updated API schema.

## Acceptance Criteria

- The `CitizenResponse` interface in `citizensSlice.ts` is updated to exactly match the new schema
- The `UpdateCitizenRequest` interface is updated to include all fields from the new schema
- The `updateCitizenThunk` is confirmed to accept and send the full `UpdateCitizenRequest` payload
- All obsolete fields (ssn, medical, etc.) are removed from the interfaces
- The state management correctly handles the new data structure

## Definition of Done

- Citizens slice interfaces match the authoritative API schema exactly
- The update citizen functionality works with the complete payload structure
- All Redux actions and reducers handle the new data model correctly
- No breaking changes to existing functionality

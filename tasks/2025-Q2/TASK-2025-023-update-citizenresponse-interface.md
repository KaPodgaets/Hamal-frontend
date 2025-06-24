---
id: TASK-2025-023
title: "Update CitizenResponse Interface in citizensSlice"
status: completed
priority: high
type: tech_debt
estimate: 1h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-020]
arch_refs: [ARCH-frontend-app]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - Updated timestamp field names to camelCase"}
---

## Description

The current `CitizenResponse` interface in `src/store/slices/citizensSlice.ts` has incorrect field names for timestamps (e.g., `FirstAppearanceTimestamp`). These must be updated to camelCase (e.g., `firstAppearanceTimestamp`) to match the authoritative Swagger/OpenAPI schema and prevent runtime errors.

## Acceptance Criteria

- The `CitizenResponse` interface in `citizensSlice.ts` accurately reflects all fields and casings from the new swagger definition.
- Timestamp fields are renamed to `firstAppearanceTimestamp`, `secondAppearanceTimestamp`, and `thirdAppearanceTimestamp`.

## Definition of Done

- Timestamp field names have been updated from PascalCase to camelCase in the CitizenResponse interface.

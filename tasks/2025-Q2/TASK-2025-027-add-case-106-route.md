---
id: TASK-2025-027
title: "Add new route for /case-106-data"
status: backlog
priority: medium
type: feature
estimate: 1h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-022]
arch_refs: [ARCH-app-case-escalation-workflow]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

To make the new `Case106DataPage` accessible, a new route definition must be added to the application's main router in `src/App.tsx`.

## Acceptance Criteria

- A new `<Route>` for `path="/case-106-data"` is added inside `src/App.tsx`. It renders `Case106DataPage` and is wrapped with `<ProtectedRoute requiredRole={1}>`.

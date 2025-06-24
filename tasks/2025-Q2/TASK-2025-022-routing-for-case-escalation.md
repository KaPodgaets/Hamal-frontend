---
id: TASK-2025-022
title: "Phase 3: Routing for Case Escalation"
status: completed
priority: medium
type: feature
estimate: 2h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-019]
children: [TASK-2025-027, TASK-2025-028]
arch_refs: [ARCH-app-case-escalation-workflow, ARCH-frontend-app]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - All child tasks completed and routing functional"}
---

## Description

Integrate the new `Case106DataPage` into the application's routing and update the existing `CitizenFormPage` to trigger the new workflow.

## Acceptance Criteria

- A new protected route for `/case-106-data` is added to `App.tsx`.
- The "Cancel" button on `CitizenFormPage.tsx` conditionally navigates to `/case-106-data` when `currentCitizen.appearanceCount >= 3`.

## Definition of Done

- All child tasks (`TASK-2025-027`, `TASK-2025-028`) are completed.

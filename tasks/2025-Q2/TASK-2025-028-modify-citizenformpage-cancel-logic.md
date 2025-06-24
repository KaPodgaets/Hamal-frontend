---
id: TASK-2025-028
title: "Modify 'Cancel' logic in CitizenFormPage"
status: completed
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
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - Modified handleCancel function to check appearanceCount and navigate conditionally"}
---

## Description

Implement the core trigger for the new 106 case workflow by modifying the "Cancel" buttons on the `src/pages/CitizenFormPage.tsx`.

## Acceptance Criteria

- The `onClick` handlers for the "Cancel" buttons on the page check if `currentCitizen.appearanceCount >= 3`. If true, they navigate to `/case-106-data`. If false, they perform the original cancel action (navigating to `/operator`).

---
id: TASK-2025-021
title: "Phase 2: UI for Case Escalation"
status: backlog
priority: high
type: feature
estimate: 8h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-019]
children: [TASK-2025-025, TASK-2025-026]
arch_refs: [ARCH-app-case-escalation-workflow, ARCH-frontend-app]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

Build the new page and all required UI components for the 106 case workflow. This includes the main data page and a reusable component for displaying copyable fields.

## Acceptance Criteria

- A reusable `CopyableField.tsx` component is created.
- A new `Case106DataPage.tsx` component is created, displaying citizen data, handling user input for the case number with validation, and integrating with the Redux state for submission and error handling.

## Definition of Done

- All child tasks (`TASK-2025-025`, `TASK-2025-026`) are completed.

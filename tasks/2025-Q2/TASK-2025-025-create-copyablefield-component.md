---
id: TASK-2025-025
title: "Create reusable CopyableField component"
status: completed
priority: high
type: feature
estimate: 2h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-021]
arch_refs: [ARCH-app-case-escalation-workflow]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - Implemented CopyableField component"}
---

## Description

To avoid duplicating UI and logic for the "field + copy button" elements required on the new `Case106DataPage`, create a reusable `CopyableField.tsx` component.

## Acceptance Criteria

- The component accepts a `label` and `value` prop. It renders a read-only `TextField` and an `IconButton` with a `ContentCopy` icon. Clicking the button copies the `value` to the clipboard.

## Definition of Done

- CopyableField component is implemented and available for use in the project.

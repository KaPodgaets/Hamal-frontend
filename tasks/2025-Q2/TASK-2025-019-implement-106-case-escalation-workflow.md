---
id: TASK-2025-019
title: "Implement 106 Case Escalation Workflow"
status: completed
priority: high
type: feature
estimate: 20h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
children: [TASK-2025-020, TASK-2025-021, TASK-2025-022]
arch_refs: [ARCH-app-case-escalation-workflow, ARCH-frontend-app, ARCH-service-hamal-api]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-24, user: "@AI-Assistant", action: "completed - All child tasks completed and end-to-end workflow functional"}
---

## Description

This epic covers the implementation of a new business process for escalating citizens who have been unreachable after multiple attempts. When a citizen's record shows three or more appearance counts, the operator will be directed to a new, specialized page to log a "106 Case" with the municipality.

## Acceptance Criteria

- When an operator handles a citizen with `appearanceCount >= 3`, clicking the "Cancel" button on `CitizenFormPage` successfully navigates them to the `/case-106-data` page.
- The new `Case106DataPage` correctly displays required citizen information and allows the operator to enter a 6-digit case number.
- After entering a valid case number and clicking "Save", a `POST` request is successfully sent to `/citizen/106-case`.
- The operator is redirected to the `/operator` page upon successful submission or cancellation.
- If the API call fails, an appropriate error message is displayed.

## Definition of Done

- All child tasks are completed.
- The end-to-end workflow is tested and functional.
- A new record for the 106 case is visible in the backend database.

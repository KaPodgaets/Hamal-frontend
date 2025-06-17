---
id: TASK-2025-009
title: "Create 'Get Next Citizen' Page for Operator"
status: backlog
priority: medium
type: feature
estimate: 3h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
parents: [TASK-2025-007]
arch_refs: [ARCH-frontend-app]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

Create the initial page for the operator workflow. This page will allow the operator to request the next citizen from the queue.

## Acceptance Criteria

- A `GetNextCitizenPage.tsx` is created and is part of the operator's protected route.
- The page displays a button to "Get Next Citizen". Clicking it dispatches the `getNextCitizen` thunk.
- If `citizensSlice.queueIsEmpty` is `true`, the button is hidden or disabled, and the text "there are no citizens to call. Thank you for your passion" is displayed.
- If a citizen is successfully fetched, the user is automatically redirected to the citizen form page.

## Definition of Done

- The page correctly reflects the state of the citizen queue and initiates the operator's work loop.

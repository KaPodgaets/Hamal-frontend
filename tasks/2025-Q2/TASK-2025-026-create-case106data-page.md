---
id: TASK-2025-026
title: "Create Case106DataPage"
status: backlog
priority: high
type: feature
estimate: 6h
assignee: @unassigned
created: 2025-06-24
updated: 2025-06-24
parents: [TASK-2025-021]
arch_refs: [ARCH-app-case-escalation-workflow]
audit_log:
  - {date: 2025-06-24, user: "@AI-DocArchitect", action: "created with status backlog"}
---

## Description

Create the `Case106DataPage.tsx` component. This page is the core of the new workflow, allowing operators to view citizen details and submit the municipal case number.

## Acceptance Criteria

- The page is created at `src/pages/Case106DataPage.tsx` and redirects to `/operator` if `currentCitizen` is null.
- It uses the `CopyableField` component to display citizen's `FirstName`, `LastName`, `Phone1`, `email`, `StreetName`, and `BuildingNumber`.
- It displays a pre-formatted message for the operator to read to the municipality, with a copy button.
- It has a "Cancel" button that clears the current citizen and navigates to `/operator`.
- It has an input `TextField` for the `caseNumber` with validation (must be 6 digits).
- A "Save" button dispatches `post106CaseThunk` and is disabled during loading or if input is invalid.
- An MUI `<Alert severity="error">` is displayed if the Redux `error` state is not null.
- On successful submission (detected via `useEffect`), the user is navigated to `/operator`.

## Definition of Done

- The page is fully implemented with all controls, data display, validation, and state integration.

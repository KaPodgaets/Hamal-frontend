---
id: TASK-2025-010
title: "Create Citizen Form Page"
status: done
priority: medium
type: feature
estimate: 5h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
parents: [TASK-2025-007]
arch_refs: [ARCH-frontend-app]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - Citizen form page with comprehensive data entry"}
---

## Description

Build the data entry form for viewing and updating citizen information, as fetched by the `getNextCitizen` thunk.

## Acceptance Criteria

- A `CitizenFormPage.tsx` component is created.
- The component reads `currentCitizen` from the `citizensSlice` and uses it to populate the form fields.
- The form, using `react-hook-form`, allows editing fields as specified in the `UpdateCitizenRequest` model.
- On submission, the form dispatches the `updateCitizen` thunk. After a successful update, the user is redirected back to the 'Get Next Citizen' page.

## Definition of Done

- The form is fully functional for updating citizen data.

---
id: TASK-2025-008
title: "Implement Citizen Update Form"
status: backlog
priority: high
type: feature
estimate: 8h
created: 2025-06-17
updated: 2025-06-17
parents: [TASK-2025-006]
arch_refs: [ARCH-feature-operator-workflow]
audit_log:
  - {
      date: 2025-06-17,
      user: "@AI-DocArchitect",
      action: "created with status backlog",
    }
---
## Description
Develop the `CitizenForm.tsx` component. It should display all relevant citizen data and allow the operator to modify it. Use `react-hook-form` for form state management. On submission, it should call the `PUT /api/Citizens/{id}` endpoint.

## Acceptance Criteria
- The form is populated with the data of the citizen fetched in the previous step.
- Input validation (e.g., required fields) is handled on the client side.
- The "Update" button triggers the `updateCitizen` mutation.
- Success and error states are handled with appropriate user feedback (e.g., toast notifications). 
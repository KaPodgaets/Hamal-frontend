---
id: ARCH-feature-operator-workflow
title: "Frontend: Feature - Operator Workflow"
type: feature
layer: presentation
owner: "@frontend-team"
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [feature, operator, workflow, form]
depends_on: [ARCH-feature-authentication]
referenced_by: []
---
## Context
This feature encompasses the primary workflow for a call center operator. The goal is a streamlined, sequential process for fetching a citizen record, viewing/editing its information, and submitting the update.

## Structure
- **`features/operator/OperatorDashboard.tsx`**: A simple landing page for authenticated operators. It contains a single "Get Next Form" button.
- **`features/operator/CitizenForm.tsx`**: The main form component for displaying and modifying citizen data. It is likely built using `react-hook-form` for efficient state management and validation.
- **`api/citizensApi.ts`**: An RTK Query API slice that defines:
  - A query for `GET /api/Citizens/next`.
  - A mutation for `PUT /api/Citizens/{id}`.

## Behavior
1.  An operator logs in and is directed to the `OperatorDashboard`.
2.  The operator clicks the "Get Next Form" button, which triggers the `getNextCitizen` query.
3.  Upon a successful response containing a citizen record, the application navigates to a dedicated form route, e.g., `/form/{citizenId}`.
4.  The `CitizenForm` component mounts, uses the `citizenId` from the URL to display the fetched data, and enables form fields for editing.
5.  After making changes, the operator clicks "Update". This triggers the `updateCitizen` mutation with the form data and the citizen's ID.
6.  On successful submission, a success notification is shown, and the user is navigated back to the `OperatorDashboard` to repeat the process. Error states are handled within the form component, displaying relevant messages to the user.

## Evolution
### Historical
- v1: Initial design of the core operator functionality. 
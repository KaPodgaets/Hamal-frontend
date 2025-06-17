---
id: TASK-2025-017
title: "Refactor Citizen Form Page"
status: done
priority: high
type: refactor
estimate: 8h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-frontend-app]
parents: [TASK-2025-016]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - Citizen form completely overhauled with new API schema fields"}

---

## Description

Completely overhaul the citizen form in `src/pages/CitizenFormPage.tsx` to match the updated data model. Remove obsolete fields and implement all required fields from the `UpdateCitizenRequest` schema as editable inputs.

## Acceptance Criteria

- All obsolete fields (ssn, medical, etc.) are removed from the form
- The form includes editable input fields for all properties defined in the `UpdateCitizenRequest` schema
- Fields include: firstName, lastName, phone numbers, isAnsweredTheCall, address fields, etc.
- The `react-hook-form` `reset` function populates all form fields with data from `currentCitizen` on mount
- The form submission handler constructs and sends the complete `UpdateCitizenRequest` payload
- The "Cancel" button's onClick handler navigates the user to `/operator`
- All form validation works correctly with the new field structure

## Definition of Done

- Citizen form renders with complete set of editable fields matching the UpdateCitizenRequest schema
- Form submission sends PUT request to /api/Citizens/{id} with complete payload
- Cancel button correctly navigates to operator page
- Form validation and error handling work with new field structure
- User experience is smooth and intuitive

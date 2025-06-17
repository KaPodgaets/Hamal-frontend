---
id: TASK-2025-007
title: "Implement 'Get Next Form' Page"
status: backlog
priority: high
type: feature
estimate: 3h
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
Create the operator's main dashboard page, which features a "Get Next Form" button. Implement the logic to call the `GET /api/Citizens/next` endpoint and navigate to the form-filling page upon success.

## Acceptance Criteria
- The `OperatorDashboard.tsx` page is created.
- The button is disabled while a request is in progress.
- On successful API call, the app navigates to `/form/{citizenId}`.
- If the API returns no content (204), a message like "No forms available" is displayed. 
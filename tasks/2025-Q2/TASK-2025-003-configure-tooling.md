---
id: TASK-2025-003
title: "Configure Core Tooling and Folder Structure"
status: backlog
priority: high
type: chore
estimate: 4h
created: 2025-06-17
updated: 2025-06-17
parents: [TASK-2025-001]
arch_refs: [ARCH-spa-structure, ARCH-state-management]
audit_log:
  - {
      date: 2025-06-17,
      user: "@AI-DocArchitect",
      action: "created with status backlog",
    }
---
## Description
Set up and configure the core tooling for the application. This includes creating the main folder structure, configuring Tailwind CSS, and setting up the Redux store with RTK Query middleware.

## Acceptance Criteria
- The project's `src` directory matches the proposed folder structure in `ARCH-spa-structure`.
- Tailwind CSS is configured and its utility classes can be successfully applied to components.
- The Redux store is initialized in `src/app/store.ts` and provided to the React application.
- The RTK Query middleware is added to the store. 
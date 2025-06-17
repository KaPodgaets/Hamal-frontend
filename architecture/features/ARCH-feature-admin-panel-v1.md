---
id: ARCH-feature-admin-panel
title: "Frontend: Feature - Admin Panel"
type: feature
layer: presentation
owner: "@frontend-team"
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [feature, admin, user-management, data-operations]
depends_on: [ARCH-feature-authentication]
referenced_by: []
---
## Context
This feature provides administrators with a dedicated panel to perform high-privilege operations, including managing user accounts and performing bulk data operations on the citizen database.

## Structure
- **`features/admin/UserManagement.tsx`**: A component that displays a table of all users. It utilizes RTK Query hooks from `usersApi.ts` to fetch, create, update, and delete users.
- **`features/admin/DataOperations.tsx`**: A component providing the UI for the `export -> clear -> upload` workflow. It uses hooks from `adminApi.ts`.
- **`api/usersApi.ts`**: An RTK Query API slice defining endpoints for `/api/Users`.
- **`api/adminApi.ts`**: An RTK Query API slice defining endpoints for `/api/admin/citizens`.
- **Route Protection**: The entire admin panel is wrapped in the `AdminRoute` component, ensuring only authenticated users with the 'Admin' role can access it.

## Behavior
- **User Management**:
  - An admin can view a list of all users.
  - An admin can open a modal or navigate to a form to create a new user or edit an existing one.
  - An admin can delete a user, likely after a confirmation prompt.
- **Data Operations**:
  - **Export**: Clicking "Export" triggers a download of the entire `Citizens` table as a CSV file.
  - **Clear**: Clicking "Clear" shows a confirmation modal. On confirmation, it makes a `DELETE` request to clear the `Citizens` table.
  - **Upload**: An admin selects a CSV file, which is then sent via a `multipart/form-data` request to populate the `Citizens` table. The UI provides feedback on the operation's success or failure.

## Evolution
### Historical
- v1: Initial design based on the feature requirements in the project plan. 
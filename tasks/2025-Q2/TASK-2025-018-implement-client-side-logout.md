---
id: TASK-2025-018
title: "Implement Client-Side Logout"
status: done
priority: high
type: feature
estimate: 3h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-frontend-app]
parents: [TASK-2025-004]
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - Client-side logout implemented with proper auth cleanup"}

---

## Description

Implement secure and predictable logout functionality by ensuring all "Sign out" buttons properly dispatch the logout action and clear the user's session from both Redux state and localStorage.

## Acceptance Criteria

- In `src/pages/AdminDashboard.tsx`, the "Sign out" button's onClick handler dispatches the `logout()` action from `authSlice`
- In `src/pages/GetNextCitizenPage.tsx`, the "Sign out" button's onClick handler also dispatches the `logout()` action
- Clicking any "Sign out" button clears the `token` and `role` from localStorage and Redux state
- After logout, the user is redirected to `/login`
- The logout process is secure and removes all authentication data from the client

## Definition of Done

- All sign out buttons properly trigger the logout action
- Authentication tokens are completely cleared from localStorage
- Redux state is properly reset on logout
- User is redirected to login page after logout
- No authentication data remains in the browser after logout

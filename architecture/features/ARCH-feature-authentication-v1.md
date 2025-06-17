---
id: ARCH-feature-authentication
title: "Frontend: Feature - Authentication and Authorization"
type: feature
layer: presentation
owner: "@frontend-team"
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [feature, auth, login, jwt, rbac]
depends_on: [ARCH-spa-structure, ARCH-state-management]
referenced_by: []
---
## Context
This feature provides secure access to the application. It handles user login, session management via JSON Web Tokens (JWT), and role-based access control (RBAC) to protect specific parts of the application.

## Structure
- **`features/auth/LoginPage.tsx`**: A presentational component for the login form. It uses the `useLoginMutation` hook from `authApi.ts` to submit credentials.
- **`features/auth/authSlice.ts`**: A Redux slice that manages the authentication state on the client, including the JWT and the authenticated user's profile (e.g., role, username).
- **`api/authApi.ts`**: An RTK Query API slice that defines the `login` mutation, targeting the `POST /api/Auth/login` endpoint.
- **Axios Interceptor**: A globally configured Axios instance includes an interceptor that automatically attaches the `Authorization: Bearer <token>` header to every outgoing request if a token exists in the Redux store. It also handles global `401 Unauthorized` responses by logging the user out.
- **`components/layout/ProtectedRoute.tsx`**: A higher-order component that wraps routes requiring authentication. It checks for a valid token in the `authSlice` and redirects to `/login` if none is found.
- **`components/layout/AdminRoute.tsx`**: A wrapper that extends `ProtectedRoute` by also checking if the user's role is 'Admin'.

## Behavior
1.  A user navigates to a protected route and is redirected to `/login`.
2.  The user enters their credentials in `LoginPage.tsx` and submits the form.
3.  The `login` mutation is triggered, sending a request to the backend.
4.  On a successful response, the returned JWT and user data are stored in the Redux `authSlice` and persisted to `localStorage`.
5.  The user is redirected to their default dashboard.
6.  For subsequent requests to the backend, the Axios interceptor attaches the JWT.
7.  If the user attempts to access an admin-only route, the `AdminRoute` component will deny access if their role is not 'Admin'.
8.  If the API returns a `401`, the interceptor will clear the `authSlice` and `localStorage`, redirecting the user to the login page.

## Evolution
### Historical
- v1: Initial design for a standard token-based authentication flow in a React SPA. 
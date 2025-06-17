---
id: ARCH-state-management
title: "Frontend: State Management Strategy"
type: component
layer: presentation
owner: "@frontend-team"
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [state-management, redux, rtk-query, axios]
depends_on: []
referenced_by: []
---
## Context
The application employs a dual strategy for state management to clearly separate server cache from client-side UI state. This approach leverages Redux Toolkit (RTK) for its efficiency and modern patterns.

## Structure
- **Server State & Cache**:
  - **RTK Query**: This is the primary tool for all interactions with the backend API. It handles data fetching, caching, re-fetching, loading states, and error states automatically.
  - **API Slices**: API definitions are co-located in `src/api/`, with one slice per OpenAPI tag (e.g., `authApi.ts`, `usersApi.ts`).
  - **Axios Base Query**: RTK Query is configured with a custom `axiosBaseQuery` to use a pre-configured Axios instance for all HTTP requests.

- **Global Client State**:
  - **Redux Slices**: A standard Redux Toolkit `slice` (`features/auth/authSlice.ts`) is used for managing purely client-side global state. This is limited to user authentication status (JWT token, user role) that needs to be accessible across the entire application.

- **Local Component State**:
  - **React Hooks**: Standard React hooks (`useState`, `useReducer`) and form libraries (`react-hook-form`) are used for managing state that is local to a single component or feature, such as form inputs or UI toggles.

## Behavior
1.  A component needs data from the server (e.g., list of users).
2.  It calls a generated hook from an RTK Query API slice (e.g., `useGetUsersQuery()`).
3.  RTK Query handles the request, caching the response. Subsequent calls for the same data will receive the cached version until it's invalidated.
4.  The component automatically re-renders with loading, success, or error states.
5.  A component needs the user's role.
6.  It uses a selector to read the `authSlice` from the Redux store.

## Evolution
### Historical
- v1: Initial design choosing RTK Query for its efficiency and integration with Redux. 
---
id: ARCH-frontend-app
title: "Frontend Application Foundation"
type: component
layer: presentation
owner: @unassigned
version: v1
status: current
created: 2025-06-17
updated: 2025-06-19
tags: [react, vite, typescript, spa, redux, mui, react-router]
depends_on: [ARCH-service-hamal-api]
referenced_by: []
---

## Context

This document describes the foundational architecture of the Hamal Call Center frontend application. It is a Single Page Application (SPA) built with React and TypeScript, bootstrapped using Vite. The application provides role-based functionality for call center 'Operators' and 'Admins'.

## Structure

The core of the application resides in the `src/` directory.

- **`src/main.tsx`**: The application's entry point, rendering the root `App` component and setting up the Redux `Provider`.
- **`src/App.tsx`**: The root component that sets up the MUI `ThemeProvider` and the `react-router-dom` `Router`. It defines all application routes.
- **`src/pages/`**: Contains all page-level components, such as `LoginPage`, `AdminDashboard`, `CitizenFormPage`, etc.
- **`src/components/`**: Contains reusable components. `ProtectedRoute.tsx` is a key component for handling role-based route access.
- **`src/services/api.ts`**: An Axios instance configured to communicate with the Hamal Backend API. It includes interceptors to automatically attach the JWT authentication token to requests and to handle 401 Unauthorized responses by logging the user out.
- **`src/store/`**: Contains the Redux Toolkit state management setup.
  - **`store.ts`**: Configures the Redux store.
  - **`slices/`**: Defines the different state slices.
    - `authSlice.ts`: Manages authentication state (token, user role), including login/logout logic and async thunks.
    - `citizensSlice.ts`: Manages state related to citizen data, including fetching the next citizen and updating citizen details.
- **Dependencies**: The application utilizes key libraries such as `@mui/material` for UI components, `react-router-dom` for routing, `axios` for API requests, and `@reduxjs/toolkit` for state management.

## Behavior

The application implements a full user workflow:
1.  **Authentication**: Users log in via the `LoginPage`. Upon successful authentication, a JWT and user role are stored in both the Redux state and `localStorage`.
2.  **Routing**: `react-router-dom` is used for all navigation. The `ProtectedRoute` component ensures that users can only access routes permitted for their role (Admin: `0`, Operator: `1`). Unauthorized access attempts redirect the user.
3.  **Operator Workflow**: Operators are directed to the `GetNextCitizenPage`. They can request the next citizen from a queue, which takes them to the `CitizenFormPage` to view and update details.
4.  **Admin Workflow**: Admins are directed to the `AdminDashboard`, from which they can navigate to manage users or perform bulk operations on citizen data (upload, download, delete).
5.  **API Interaction**: All backend communication is handled via the configured Axios instance in `services/api.ts`, which integrates with the Redux async thunks in the state slices.

## Evolution

### Planned

— A button will be added to the `CitizenFormPage` to link to an external municipal website.

### Historical

- v1: Initial project setup using Vite + React + TypeScript template.
- v1 (updated): Documented the fully implemented application with authentication, role-based routing, and core admin/operator workflows.

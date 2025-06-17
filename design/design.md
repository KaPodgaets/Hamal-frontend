# Design Plan: Hamal Frontend Application

## 1. Executive Summary & Goals
This document outlines the architectural and implementation plan for the "Hamal Frontend," a React-based single-page application (SPA) for a small call center. The plan is based on the provided `README.md` which details user workflows, required features, and a backend OpenAPI specification. The specified technology stack is React with TypeScript, Redux Toolkit (RTK) Query for API communication, Axios for HTTP requests, and Tailwind CSS for styling.

**Key Goals:**
1.  **Implement a Secure, Role-Based Interface:** Build a robust login system and protect application routes based on user roles (Admin vs. User/Operator).
2.  **Create an Efficient Operator Workflow:** Develop a streamlined user experience for call center operators to fetch, view, and update citizen data forms sequentially and without conflict.
3.  **Provide Comprehensive Admin Tooling:** Equip administrators with intuitive interfaces for managing users and performing bulk data operations (import, export, clear).

## 2. Current Situation Analysis
This is a greenfield project. All requirements are derived from the initial application description and the OpenAPI specification found in the `README.md`. There is no existing codebase to consider, allowing for a fresh implementation based on modern best practices for the chosen technology stack.

## 3. Proposed Solution / Refactoring Strategy
### 3.1. High-Level Design / Architectural Overview
The application will be structured as a modern, component-based React SPA. We will use a feature-sliced or domain-driven folder structure to organize the code logically.

- **Routing:** `react-router-dom` will manage all application routes, including protected routes that require authentication and role-based routes for admin-specific features.
- **State Management:**
    - **API State:** Redux Toolkit (RTK) Query will be the primary tool for data fetching, caching, and managing server state (loading, error, success). It will automatically generate hooks based on the OpenAPI specification.
    - **Global UI/Auth State:** A simple Redux Toolkit `slice` (`authSlice`) will manage global client-side state, specifically the user's authentication token (JWT) and profile information (role, username).
- **HTTP Client:** An `axios` instance will be configured as the base HTTP client for RTK Query. It will be equipped with interceptors to automatically attach the JWT to outgoing request headers and to handle global responses, such as logging out the user on a `401 Unauthorized` error.

**Proposed Folder Structure:**
```
src/
├── api/                  # RTK Query API slices and Axios configuration
│   ├── apiSlice.ts
│   ├── authApi.ts
│   ├── usersApi.ts
│   ├── citizensApi.ts
│   └── adminApi.ts
├── app/                  # Redux store configuration
│   └── store.ts
├── components/           # Reusable, shared UI components
│   ├── layout/
│   ├── ui/               # (e.g., Button.tsx, Input.tsx, Card.tsx, Table.tsx)
│   └── ...
├── features/             # Components and logic for specific features
│   ├── auth/
│   │   ├── authSlice.ts
│   │   └── LoginPage.tsx
│   ├── operator/
│   │   ├── OperatorDashboard.tsx
│   │   └── CitizenForm.tsx
│   └── admin/
│       ├── UserManagement.tsx
│       └── DataOperations.tsx
├── hooks/                # Custom hooks (e.g., useAuth.ts)
├── lib/                  # Utility functions, constants
├── pages/                # Top-level page components that compose features
├── App.tsx               # Main application component with router setup
└── main.tsx              # Application entry point
```

### 3.2. Key Components / Modules
- **`api/`:** Contains all RTK Query endpoint definitions. Each file corresponds to a `tag` in the OpenAPI spec (e.g., `citizensApi.ts` for the "Citizens" tag). An `axios` base query will be configured here.
- **`features/auth/`:**
    - `authSlice.ts`: Manages JWT and user data in the Redux store.
    - `LoginPage.tsx`: Renders the login form and uses the `login` mutation from `authApi`.
- **`features/operator/`:**
    - `OperatorDashboard.tsx`: A simple page with a "Get Next Form" button that triggers the `getNextCitizen` query.
    - `CitizenForm.tsx`: A form, likely built with `react-hook-form`, for displaying and updating citizen data. It will use the `updateCitizen` mutation.
- **`features/admin/`:**
    - `UserManagement.tsx`: A component displaying a table of users, with functionality to add, edit, and delete users via modals or separate forms.
    - `DataOperations.tsx`: A component with buttons for exporting data, clearing data (with a confirmation modal), and uploading a new CSV file.
- **`components/layout/`:**
    - `ProtectedRoute.tsx`: A wrapper component that checks for a valid auth token before rendering child routes, redirecting to `/login` if unauthorized.
    - `AdminRoute.tsx`: A wrapper that checks for both a valid token and an 'Admin' role.
- **`hooks/useAuth.ts`:** A custom hook to provide easy access to authentication status and user information from the `authSlice`.

### 3.3. Detailed Action Plan / Phases

#### Phase 1: Project Setup & Core Authentication
- **Objective(s):** Establish a functional project skeleton with a complete, secure authentication flow.
- **Priority:** High
- **Task 1.1: Initialize Project & Dependencies**
    - **Rationale/Goal:** Create the project and install all necessary libraries.
    - **Estimated Effort:** S
    - **Deliverable/Criteria for Completion:** A new React-TS project (using Vite) is created. Dependencies (`react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `axios`, `tailwindcss`, `react-hook-form`) are installed.
- **Task 1.2: Configure Core Tooling**
    - **Rationale/Goal:** Set up Tailwind CSS, Redux store, and the basic folder structure.
    - **Estimated Effort:** S
    - **Deliverable/Criteria for Completion:** `tailwind.config.js` is configured. The Redux store is set up in `app/store.ts`. The initial folder structure is created.
- **Task 1.3: Implement Routing & Protected Layouts**
    - **Rationale/Goal:** Create the main routing logic and route protection mechanisms.
    - **Estimated Effort:** M
    - **Deliverable/Criteria for Completion:** `App.tsx` contains router setup. `ProtectedRoute` and `AdminRoute` components are implemented.
- **Task 1.4: Implement Authentication Flow**
    - **Rationale/Goal:** Build the client-side logic for user login, logout, and session management.
    - **Estimated Effort:** M
    - **Deliverable/Criteria for Completion:**
        - `LoginPage.tsx` is created.
        - `authApi.ts` is created with a `login` mutation endpoint.
        - `authSlice.ts` is created to handle setting/clearing the JWT and user data.
        - JWT is stored in `localStorage` upon successful login.
        - An Axios interceptor is configured to attach the bearer token to all API requests.

#### Phase 2: Operator Workflow
- **Objective(s):** Implement the primary workflow for call center operators.
- **Priority:** High (Depends on Phase 1)
- **Task 2.1: Implement "Get Next Form" Page**
    - **Rationale/Goal:** Allow operators to fetch the next available citizen record.
    - **Estimated Effort:** S
    - **Deliverable/Criteria for Completion:** An `OperatorDashboard.tsx` page with a single button. Clicking it calls the `GET /api/Citizens/next` endpoint and navigates to the form page with the fetched citizen's ID.
- **Task 2.2: Implement Citizen Update Form**
    - **Rationale/Goal:** Provide the interface for operators to view and modify citizen data.
    - **Estimated Effort:** M
    - **Deliverable/Criteria for Completion:**
        - A `CitizenForm.tsx` component that takes a citizen ID as a prop/URL parameter.
        - It fetches the full citizen details to populate the form.
        - The form is built with `react-hook-form` for state management and validation.
        - The "Update" button calls the `PUT /api/Citizens/{id}` endpoint and handles success/error states (e.g., showing a notification and navigating back to the dashboard).

#### Phase 3: Admin Features
- **Objective(s):** Build all required administrative functionalities.
- **Priority:** Medium (Depends on Phase 1)
- **Task 3.1: Implement User Management (CRUD)**
    - **Rationale/Goal:** Allow admins to manage operator accounts.
    - **Estimated Effort:** L
    - **Deliverable/Criteria for Completion:**
        - A `UserManagement.tsx` page protected by `AdminRoute`.
        - RTK Query endpoints for `GET`, `POST`, `PUT`, `DELETE` on `/api/Users`.
        - A table displays all users. Buttons for "Add User", "Edit", and "Delete" are present.
        - A modal or form is used for creating/editing user details.
- **Task 3.2: Implement Data Operations**
    - **Rationale/Goal:** Allow admins to perform bulk data management tasks.
    - **Estimated Effort:** M
    - **Deliverable/Criteria for Completion:**
        - A `DataOperations.tsx` page protected by `AdminRoute`.
        - "Export Data" button that calls `GET /api/admin/citizens/export` and triggers a file download in the browser.
        - "Clear Data" button that calls `DELETE /api/admin/citizens` after a confirmation modal.
        - A file input for "Upload Data" that calls `POST /api/admin/citizens/upload` with `FormData`.
        - UI provides feedback for all operations (loading indicators, success/error messages).

### 3.4. Data Model Changes
The frontend will define TypeScript interfaces to match the data contracts from the backend's OpenAPI specification. This ensures type safety throughout the application.

```typescript
// Example: src/api/models.ts
export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface UpdateCitizenRequest {
  firstName?: string;
  lastName?: string;
  // ... all other fields
}

// ... other request and response models
```

### 3.5. API Design / Interface Changes
The frontend will consume the API as described in the `README.md`. All API interactions will be centralized in the `src/api/` directory using RTK Query's `createApi`. This will provide generated hooks (e.g., `useLoginMutation`, `useGetNextCitizenQuery`) for use in components, abstracting away the direct use of `axios`.

## 4. Key Considerations & Risk Mitigation
### 4.1. Technical Risks & Challenges
- **JWT Storage:** Using `localStorage` is simple but vulnerable to XSS attacks.
    - **Mitigation:** For this project's scope, we will proceed with `localStorage` but clearly document the risk. A more secure alternative (`HttpOnly` cookies) would require backend changes and is considered out of scope for the initial plan.
- **Error Handling:** Inconsistent error handling can lead to a poor user experience.
    - **Mitigation:** Implement a global error handling strategy. The Axios interceptor can catch network-level errors, while RTK Query's built-in error states can be used in components to display specific error messages. A toast notification system (e.g., `react-toastify`) should be used for non-blocking feedback.
- **UI/UX Consistency:** Using Tailwind CSS without a design system can lead to inconsistent styling.
    - **Mitigation:** Define reusable UI components in `src/components/ui/` (e.g., `Button.tsx`, `Input.tsx`) with pre-defined styles and variants. This ensures a consistent look and feel.

### 4.2. Dependencies
- **Backend API:** The entire frontend development is dependent on a running and stable backend that conforms to the provided OpenAPI spec.
- **Inter-Task:** Phases are designed to be mostly sequential. Admin features (Phase 3) can be developed in parallel with the Operator Workflow (Phase 2) after Phase 1 is complete.

### 4.3. Non-Functional Requirements (NFRs) Addressed
- **Security:** Addressed via role-based route protection and secure handling of the JWT on the client-side. The `401` interceptor prevents the app from remaining in a broken state after a session expires.
- **Usability:** Addressed by providing clear feedback for all asynchronous operations (loading spinners, success/error toasts) and using a form library (`react-hook-form`) for a good form-filling experience.
- **Maintainability:** Addressed by a clean, feature-sliced folder structure and centralizing all API logic in RTK Query slices, making it easy to find and update code.

## 5. Success Metrics / Validation Criteria
- All user stories described in the `README.md` are fully implemented and functional.
- The application correctly enforces role-based access control.
- Operators can successfully fetch and update citizen records, and the locking mechanism works as intended (verified through testing).
- Admins can successfully manage users and perform all bulk data operations.
- The application is responsive and provides clear visual feedback for all user interactions.

## 6. Assumptions Made
- The backend API is available and adheres strictly to the OpenAPI specification provided.
- The JWT provided by the backend contains the user's role, which can be decoded or is available from the login response.
- For the initial design, a simple re-login is sufficient upon token expiration (no refresh token flow is required).
# Refactoring Plan: Citizen Form and Logout Logic (Final)

## 1. Executive Summary & Goals

This document outlines a definitive refactoring plan to align the Hamal Call Center Frontend with the latest, authoritative API schema. The primary objective is to refactor the application to use the correct data models for citizen information and to implement robust user logout functionality.

- **Key Goals:**
  1.  **Full API Schema Alignment:** Refactor the entire citizen data flow—from documentation and state management to the UI—to precisely match the provided `CitizenResponse` and `UpdateCitizenRequest` schemas.
  2.  **Implement Correct Logout:** Ensure that "Logout" and "Sign out" buttons perform a secure, client-side logout by clearing the session from the Redux store and local storage, then redirecting to the login page.
  3.  **Improve User Experience:** Implement the "Cancel" button on the citizen form to correctly navigate the user back to the operator's main page.

## 2. Current Situation Analysis

The application is misaligned with the new, authoritative API schema provided in the latest user request. Key issues are:

- **Outdated Data Models:** The interfaces and logic within `src/store/slices/citizensSlice.ts` and `src/pages/CitizenFormPage.tsx` reflect an old, complex data model that is now obsolete.
- **Incomplete Logout Logic:** "Sign out" buttons do not dispatch the `logout` action, leaving stale authentication tokens in the browser.
- **Stale API Documentation:** The `architecture/openapi-doc.md` file is outdated and needs to be replaced with the new schema to act as the single source of truth.

## 3. Proposed Solution / Refactoring Strategy

### 3.1. High-Level Design / Architectural Overview

The refactoring will follow a strict, two-phase approach to ensure data integrity and a smooth implementation process.

1.  **Phase 1: Foundation and Data Layer Synchronization:** Update the core documentation and state management layer to match the new API schema. This establishes a correct foundation before any UI work begins.
2.  **Phase 2: UI and Interaction Layer Implementation:** With the data layer aligned, refactor the `CitizenFormPage` and implement the correct behavior for all interactive elements like "Save," "Cancel," and "Logout."

### 3.2. API Design / Interface Changes

The new OpenAPI schema is the definitive source of truth. The following TypeScript interfaces will be implemented in the frontend to match it precisely.

#### Final `CitizenResponse` Schema

This interface will be used in `citizensSlice.ts` for the data received from `GET /api/Citizens/next`.

```typescript
// To be implemented in citizensSlice.ts
interface CitizenResponse {
  id: number;
  streetName: string;
  buildingNumber: string;
  flatNumber: string;
  firstName: string;
  lastName: string;
  familyNumber: number;
  isLonely: boolean;
  isAddressWrong: boolean;
  newStreetName: string | null;
  newBuildingNumber: string | null;
  newFlatNumber: string | null;
  phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  isAnsweredTheCall: boolean;
}
```

#### Final `UpdateCitizenRequest` Schema

This interface will be used in `citizensSlice.ts` for the payload of `PUT /api/Citizens/{id}`. **Crucially, the latest schema confirms that all fields from `CitizenResponse` (except `id`) are included in the update payload.**

```typescript
// To be implemented in citizensSlice.ts
interface UpdateCitizenRequest {
  streetName: string;
  buildingNumber: string;
  flatNumber: string;
  firstName: string;
  lastName: string;
  familyNumber: number;
  isLonely: boolean;
  isAddressWrong: boolean;
  newStreetName: string | null;
  newBuildingNumber: string | null;
  newFlatNumber: string | null;
  phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  isAnsweredTheCall: boolean;
}
```

### 3.3. Detailed Action Plan / Phases

#### Phase 1: Foundation and Data Layer Synchronization

- **Objective(s):** Synchronize all data contracts and documentation with the new, definitive OpenAPI schema.
- **Priority:** High

- **Task 1.1: Replace `openapi-doc.md`**

  - **Rationale/Goal:** Establish a single, authoritative source of truth for the API contract.
  - **Estimated Effort:** S
  - **Deliverable/Criteria for Completion:** The content of `architecture/openapi-doc.md` is completely replaced with the new OpenAPI JSON schema.

- **Task 1.2: Refactor `citizensSlice.ts`**
  - **Rationale/Goal:** Align Redux state management for citizens with the now-authoritative API contract.
  - **Estimated Effort:** M
  - **Deliverable/Criteria for Completion:**
    - The `CitizenResponse` and `UpdateCitizenRequest` interfaces in `src/store/slices/citizensSlice.ts` are updated to exactly match the new schema.
    - The `updateCitizenThunk` is confirmed to accept and send the full `UpdateCitizenRequest` payload.

#### Phase 2: UI & Interaction Layer Implementation

- **Objective(s):** Implement the required UI changes in the citizen form and enable correct logout functionality.
- **Priority:** High

- **Task 2.1: Refactor `CitizenFormPage.tsx`**

  - **Rationale/Goal:** Rebuild the citizen form to match the updated data model, making all relevant fields editable as per the final schema.
  - **Estimated Effort:** L
  - **Deliverable/Criteria for Completion:**
    - The form in `src/pages/CitizenFormPage.tsx` is completely overhauled. All obsolete fields (`ssn`, medical, etc.) are removed.
    - The form now includes **editable** input fields for all properties defined in the `UpdateCitizenRequest` schema (including `firstName`, `lastName`, phone numbers, `isAnsweredTheCall`, etc.).
    - The `react-hook-form` `reset` function is used to populate all form fields with the data from `currentCitizen` when the component mounts.
    - The form submission (`onSubmit`) handler constructs and sends the complete `UpdateCitizenRequest` payload.
    - The "Cancel" button's `onClick` handler navigates the user to `/operator`.

- **Task 2.2: Implement Client-Side Logout**
  - **Rationale/Goal:** Ensure a secure and predictable logout experience by completely clearing the user's session from the client.
  - **Estimated Effort:** S
  - **Deliverable/Criteria for Completion:**
    - In `src/pages/AdminDashboard.tsx`, the "Sign out" button's `onClick` handler is changed to dispatch the `logout()` action from `authSlice`.
    - In `src/pages/GetNextCitizenPage.tsx`, the "Sign out" button's `onClick` handler is also changed to dispatch the `logout()` action.

## 4. Key Considerations & Risk Mitigation

### 4.1. Technical Risks & Challenges

- There are no significant remaining technical risks, as the latest OpenAPI schema has resolved all previous ambiguities regarding the data models. The path forward is clear.

### 4.2. Dependencies

- **Internal:** Phase 2 (UI changes) is strictly dependent on the completion of Phase 1 (Data Layer changes).

### 4.3. Non-Functional Requirements (NFRs) Addressed

- **Maintainability:** Aligning all layers of the application (documentation, state, UI) with a single, authoritative API schema drastically reduces complexity and improves long-term maintainability.
- **Security:** Implementing a proper client-side logout that removes the JWT from local storage is a fundamental security best practice.
- **Data Integrity:** By making all fields from the `UpdateCitizenRequest` editable, the form now correctly reflects the full scope of data that an operator can modify, ensuring data integrity between the frontend and backend.

## 5. Success Metrics / Validation Criteria

- The `CitizenFormPage` renders with a complete set of editable fields that match the `UpdateCitizenRequest` schema.
- Submitting the citizen form sends a `PUT` request to `/api/Citizens/{id}` with a payload containing all fields from the form.
- Clicking the "Cancel" button on the citizen form successfully navigates the user to the `/operator` route.
- Clicking any "Sign out" button clears the `token` and `role` from `localStorage` and the Redux state, and redirects the user to `/login`.

## 6. Assumptions Made

- The latest OpenAPI schema provided is final and authoritative, superseding all previous information.
- The `logout` action in `authSlice` correctly performs all necessary cleanup of state and `localStorage`.

## 7. Open Questions / Areas for Further Investigation

- All previous open questions have been resolved by the provision of the final OpenAPI schema. This plan is now ready for implementation.

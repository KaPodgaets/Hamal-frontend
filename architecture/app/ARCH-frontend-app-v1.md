---
id: ARCH-frontend-app
title: "Application. Frontend Application"
type: application
layer: presentation
owner: @unassigned
version: v1
status: current
created: 2025-06-17
updated: 2025-06-24
tags: [react, vite, typescript, spa, redux, mui, react-router]
depends_on: [ARCH-service-hamal-api]
referenced_by: []
---

## Context

This document describes the frontend application architecture for the Hamal system. The application is a Single Page Application (SPA) built with React, TypeScript, and Vite, using Material-UI for the user interface and Redux Toolkit for state management.

## Structure

The application follows a component-based architecture with clear separation of concerns:

- **`App.tsx`**: Main application component with routing configuration
- **`pages/`**: Page-level components for different user workflows
- **`components/`**: Reusable UI components
- **`store/`**: Redux store configuration and slices
- **`services/`**: API service layer
- **`assets/`**: Static assets like images and icons

## Behavior

The application implements role-based access control with three user roles:

- **Admin (role: 0)**: Access to user management and citizen data management
- **Operator (role: 1)**: Access to citizen workflow (get next citizen, update citizen data)
- **Viewer (role: 2)**: Read-only access to citizen data

The application uses React Router for navigation and ProtectedRoute components to enforce role-based access control.

## Evolution

### Current

- Basic authentication and role-based routing
- Admin dashboard with user and citizen data management
- Operator workflow for processing citizen data
- Redux state management for authentication and citizen data

### Planned

— Implement a new workflow for escalating cases for citizens with repeated contact attempts (`appearanceCount >= 3`). This will involve a new `Case106DataPage`, conditional routing from the `CitizenFormPage`, and integration with a new backend endpoint for logging the escalation.

### Historical

- v1: Initial implementation with basic authentication and role-based routing

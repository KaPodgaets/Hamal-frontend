---
id: ARCH-spa-structure
title: "Frontend: Core Application Structure"
type: architecture
layer: presentation
owner: "@frontend-team"
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [react, spa, structure, vite, tailwind]
depends_on: [ARCH-state-management]
referenced_by: []
---
## Context
The Hamal Frontend is a Single Page Application (SPA) built with React and TypeScript, bootstrapped using Vite for a fast development experience. This document describes the core project structure, routing, and styling foundation.

## Structure
The project follows a feature-sliced or domain-driven folder structure to promote modularity and scalability.
```
src/
├── api/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── pages/
├── App.tsx
└── main.tsx
```
- **`api/`**: Contains RTK Query API slices and a shared Axios instance configuration.
- **`app/`**: Holds the Redux store configuration.
- **`components/`**: Houses reusable, presentation-only UI components (e.g., Button, Input, Card) and layouts.
- **`features/`**: Contains self-contained application features, each with its own components, hooks, and state logic (e.g., `auth`, `operator`, `admin`).
- **`hooks/`**: For custom, shared React hooks.
- **`lib/`**: General utility functions and constants.
- **`pages/`**: Top-level components that compose features and layouts to represent application pages.
- **`App.tsx`**: The main application component responsible for setting up the router (`react-router-dom`).
- **Styling**: Tailwind CSS is used for utility-first styling, configured in `tailwind.config.js`.

## Behavior
- **Routing**: `react-router-dom` is used for all client-side routing. This includes public routes (like `/login`) and protected routes that require authentication.
- **Component Rendering**: The application renders components based on the current route, with `pages` components acting as the entry points for different views.

## Evolution
### Historical
- v1: Initial architectural design based on modern React best practices. 
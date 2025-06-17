---
id: ARCH-frontend-app
title: "Frontend Application Foundation"
type: component
layer: presentation
owner: @unassigned
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [react, vite, typescript, spa]
depends_on: [ARCH-service-hamal-api]
referenced_by: []
---

## Context

This document describes the foundational architecture of the Hamal Call Center frontend application. It is a Single Page Application (SPA) built with React and TypeScript, bootstrapped using Vite. The current state of the application is the initial boilerplate setup.

## Structure

The core of the application resides in the `src/` directory.

- `index.html`: The main entry point for the browser.
- `src/main.tsx`: The application's entry point, which renders the root React component into the DOM.
- `src/App.tsx`: The root React component. In its current state, it displays a simple counter, serving as a placeholder.
- `package.json`: Defines project metadata and dependencies. While dependencies for future features (`@reduxjs/toolkit`, `axios`, `react-router-dom`) are listed, they are not yet integrated into the application logic.

## Behavior

The application currently has no dynamic behavior beyond the default Vite/React counter. There is no routing, state management (beyond local component state), or API communication implemented.

## Evolution

### Planned

- The application will be developed to implement the full functionality described in `design/architecture_plan.md`.
- This includes implementing user authentication (login/logout), role-based routing for 'Admin' and 'Operator' users, and integrating with the backend via the `ARCH-service-hamal-api`.

### Historical

- v1: Initial project setup using Vite + React + TypeScript template.

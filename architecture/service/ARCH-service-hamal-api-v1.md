---
id: ARCH-service-hamal-api
title: "Service. Hamal Backend API"
type: service
layer: infrastructure
owner: @backend-team
version: v1
status: current
created: 2025-06-17
updated: 2025-06-24
tags: [api, backend, rest]
depends_on: []
referenced_by: []
---

## Context

This document describes the Hamal Backend API service architecture. The API provides RESTful endpoints for citizen data management, user authentication, and administrative operations.

## Structure

The API is built with ASP.NET Core and provides the following key endpoints:

- **Authentication**: `POST /api/Auth/login` for user authentication
- **Citizens**: `GET /api/Citizens/next` and `PUT /api/Citizens/{id}` for citizen workflow
- **Admin**: `GET`, `POST`, `DELETE /api/admin/citizens` for bulk operations
- **Users**: `GET`, `POST`, `PUT`, `DELETE /api/admin/users` for user management

## Behavior

The API implements JWT-based authentication and role-based authorization. It provides endpoints for:

- Operator workflow (get next citizen, update citizen data)
- Admin operations (user management, citizen data bulk operations)
- Authentication and authorization

## Evolution

### Current

- Complete REST API with authentication and authorization
- Citizen data management endpoints
- Admin user and data management endpoints
- JWT-based security

### Planned

- A new endpoint `POST /citizen/106-case` will be added to allow operators to log that a case has been escalated to the municipal call center.

### Historical

- v1: Initial API implementation with core endpoints

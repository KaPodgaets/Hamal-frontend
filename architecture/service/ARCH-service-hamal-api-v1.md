---
id: ARCH-service-hamal-api
title: "Service: Hamal Backend API"
type: service
layer: infrastructure
owner: @backend-team
version: v1
status: current
created: 2025-06-17
updated: 2025-06-17
tags: [api, backend, rest]
depends_on: []
referenced_by: []
---

## Context

This component represents the external Hamal Backend API, which provides all necessary data and business logic for the call center application. The frontend application depends on this service for its core functionality.

## Structure

This is a RESTful API service. The detailed specification of its endpoints, request/response models, and authentication mechanism is provided in the OpenAPI document.

- **API Specification:** `architecture/openapi-doc.md`

Key functional areas provided by the API:

- `Auth`: User authentication.
- `Users`: User management (for admins).
- `Citizens`: Core workflow for retrieving and updating citizen data.
- `Admin`: Bulk data operations (for admins).

## Behavior

The API is responsible for authenticating users, providing role-based access, managing citizen records, and allowing administrative data management. The frontend is expected to interact with this API using HTTP requests, authenticating with a Bearer token.

## Evolution

### Planned

- The frontend application will be fully integrated with this API to implement all user workflows.

### Historical

- v1: Initial API specification provided.

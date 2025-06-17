---
id: TASK-2025-015
title: "Replace OpenAPI Documentation"
status: done
priority: high
type: refactor
estimate: 2h
assignee: @unassigned
created: 2025-06-17
updated: 2025-06-17
arch_refs: [ARCH-service-hamal-api]
parents: []
audit_log:
  - {date: 2025-06-17, user: "@AI-DocArchitect", action: "created with status backlog"}
  - {date: 2025-06-17, user: "@AI-Assistant", action: "completed - OpenAPI documentation updated with new authoritative schemas"}

---

## Description

Replace the outdated `architecture/openapi-doc.md` file with the new, authoritative OpenAPI schema to establish a single source of truth for the API contract.

## Acceptance Criteria

- The content of `architecture/openapi-doc.md` is completely replaced with the new OpenAPI JSON schema
- The new schema includes the definitive `CitizenResponse` and `UpdateCitizenRequest` interfaces
- All previous outdated API documentation is superseded by the new schema
- The documentation serves as the authoritative reference for all API contracts

## Definition of Done

- The openapi-doc.md file contains the latest, authoritative API schema
- The schema accurately reflects the current backend API structure
- All development teams can reference this document as the single source of truth

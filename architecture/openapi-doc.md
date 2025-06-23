# Back-end openapi documentation

```
{
  "openapi": "3.0.4",
  "info": {
    "title": "Hamal API",
    "version": "v1"
  },
  "paths": {
    "/api/admin/citizens": {
      "delete": {
        "tags": [
          "Admin"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "Admin"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/File"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/File"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/File"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Admin"
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              },
              "encoding": {
                "file": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/Auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/LoginResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Citizens/next": {
      "get": {
        "tags": [
          "Citizens"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/CitizenResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CitizenResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/CitizenResponse"
                }
              }
            }
          },
          "204": {
            "description": "No Content"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Citizens/{id}": {
      "put": {
        "tags": [
          "Citizens"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCitizenRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCitizenRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCitizenRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/Citizens/106-case": {
      "post": {
        "tags": [
          "Citizens"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCallcenterCaseRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCallcenterCaseRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCallcenterCaseRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Users": {
      "get": {
        "tags": [
          "Users"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserResponse"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Users/{id}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/NoContentResult"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CitizenResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "streetName": {
            "type": "string",
            "nullable": true
          },
          "buildingNumber": {
            "type": "string",
            "nullable": true
          },
          "flatNumber": {
            "type": "string",
            "nullable": true
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "familyNumber": {
            "type": "integer",
            "format": "int32"
          },
          "isLonely": {
            "type": "boolean"
          },
          "isAddressWrong": {
            "type": "boolean"
          },
          "newStreetName": {
            "type": "string",
            "nullable": true
          },
          "newBuildingNumber": {
            "type": "string",
            "nullable": true
          },
          "newFlatNumber": {
            "type": "string",
            "nullable": true
          },
          "phone1": {
            "type": "string",
            "nullable": true
          },
          "phone2": {
            "type": "string",
            "nullable": true
          },
          "phone3": {
            "type": "string",
            "nullable": true
          },
          "isAnsweredTheCall": {
            "type": "boolean"
          },
          "hasMamad": {
            "type": "boolean"
          },
          "hasMiklatPrati": {
            "type": "boolean"
          },
          "hasMiklatZiburi": {
            "type": "boolean"
          },
          "hasMobilityRestriction": {
            "type": "boolean"
          },
          "isDead": {
            "type": "boolean"
          },
          "isLeftTheCity": {
            "type": "boolean"
          },
          "hasTemporaryAddress": {
            "type": "boolean"
          },
          "isTemporaryAbroad": {
            "type": "boolean"
          },
          "temporaryStreetName": {
            "type": "string",
            "nullable": true
          },
          "temporaryBuildingNumber": {
            "type": "string",
            "nullable": true
          },
          "temporaryFlat": {
            "type": "string",
            "nullable": true
          },
          "appearanceCount": {
            "type": "integer",
            "format": "int32"
          },
          "firstAppearanceTimestamp": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "secondAppearanceTimestamp": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "thirdAppearanceTimestamp": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CreateCallcenterCaseRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "caseNumber": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CreateUserRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/Role"
          }
        },
        "additionalProperties": false
      },
      "File": {
        "type": "object",
        "additionalProperties": false
      },
      "LoginRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LoginResponse": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "NoContentResult": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "ProblemDetails": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "nullable": true
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "detail": {
            "type": "string",
            "nullable": true
          },
          "instance": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": { }
      },
      "Role": {
        "enum": [
          0,
          1
        ],
        "type": "integer",
        "format": "int32"
      },
      "UpdateCitizenRequest": {
        "type": "object",
        "properties": {
          "streetName": {
            "type": "string",
            "nullable": true
          },
          "buildingNumber": {
            "type": "string",
            "nullable": true
          },
          "flatNumber": {
            "type": "string",
            "nullable": true
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "familyNumber": {
            "type": "integer",
            "format": "int32"
          },
          "isLonely": {
            "type": "boolean"
          },
          "isAddressWrong": {
            "type": "boolean"
          },
          "newStreetName": {
            "type": "string",
            "nullable": true
          },
          "newBuildingNumber": {
            "type": "string",
            "nullable": true
          },
          "newFlatNumber": {
            "type": "string",
            "nullable": true
          },
          "phone1": {
            "type": "string",
            "nullable": true
          },
          "phone2": {
            "type": "string",
            "nullable": true
          },
          "phone3": {
            "type": "string",
            "nullable": true
          },
          "isAnsweredTheCall": {
            "type": "boolean"
          },
          "hasMamad": {
            "type": "boolean"
          },
          "hasMiklatPrati": {
            "type": "boolean"
          },
          "hasMiklatZiburi": {
            "type": "boolean"
          },
          "hasMobilityRestriction": {
            "type": "boolean"
          },
          "isDead": {
            "type": "boolean"
          },
          "isLeftTheCity": {
            "type": "boolean"
          },
          "hasTemporaryAddress": {
            "type": "boolean"
          },
          "isTemporaryAbroad": {
            "type": "boolean"
          },
          "temporaryStreetName": {
            "type": "string",
            "nullable": true
          },
          "temporaryBuildingNumber": {
            "type": "string",
            "nullable": true
          },
          "temporaryFlat": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/Role"
          }
        },
        "additionalProperties": false
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "apiKey",
        "description": "Please enter into field the word 'Bearer' followed by a space and the JWT value",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "Bearer": [ ]
    }
  ]
}
```

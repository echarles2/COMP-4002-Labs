const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Pixell River Directory API",
    version: "1.0.0",
    description: "API documentation for the Pixell River Directory project."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server"
    }
  ],
  tags: [
    { name: "Employees", description: "Employee directory endpoints" },
    { name: "Organization", description: "Organization role endpoints" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      EmployeeCreateRequest: {
        type: "object",
        required: ["firstName", "lastName", "departmentName"],
        properties: {
          firstName: { type: "string", example: "Ethan" },
          lastName: { type: "string", example: "Charles" },
          departmentName: { type: "string", example: "Engineering" }
        }
      },
      OrganizationCreateRequest: {
        type: "object",
        required: ["firstName", "lastName", "role"],
        properties: {
          firstName: { type: "string", example: "Ethan" },
          lastName: { type: "string", example: "Charles" },
          role: { type: "string", example: "Team Lead" }
        }
      }
    }
  },
  paths: {
    "/employees": {
      get: {
        tags: ["Employees"],
        summary: "Get all departments and employees",
        responses: {
          "200": {
            description: "A list of departments with employees"
          }
        }
      },
      post: {
        tags: ["Employees"],
        summary: "Create a new employee entry",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EmployeeCreateRequest"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Employee created successfully"
          },
          "400": {
            description: "Validation error"
          },
          "401": {
            description: "Authentication required"
          }
        }
      }
    },
    "/organization": {
      get: {
        tags: ["Organization"],
        summary: "Get all organization role entries",
        responses: {
          "200": {
            description: "A list of organization roles"
          }
        }
      },
      post: {
        tags: ["Organization"],
        summary: "Create a new organization entry",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrganizationCreateRequest"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Organization entry created successfully"
          },
          "400": {
            description: "Validation error"
          },
          "401": {
            description: "Authentication required"
          }
        }
      }
    }
  }
};

export default swaggerDocument;
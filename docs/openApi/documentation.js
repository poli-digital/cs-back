const swaggerDocument = {
    "swagger": "2.0",
    "info": {
      "description": "This is an api that communicates with the API's of Piperun, Polichat, Superlógica and also with a Data Warehouse. It was created to feed a front-end page in React for centralizing information similar to a dashBoard.",
      "version": "1.0.0",
      "title": "API Polics",
      "termsOfService": "#",
      "contact": {
        "email": "douglas.freitas@polichat.com.br"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
      {
        "name": "auth",
        "description": "Everything about auth"
      },
      {
        "name": "companies",
        "description": "Everything about your Companies"
      }
    ],
    "schemes": [
      "https",
      "http"
    ],
    "paths": {
      "/auth/login": {
        "post": {
          "tags": [
            "auth"
          ],
          "summary": "Login to get the authentication token",
          "consumes": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Access credentials",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Auth"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully logged in!",
              "headers": {
                "token": {
                  "description": "Token that will be used to make the other requests.",
                  "type": "string"
                }
              }
            },
            "404": {
              "description": "Invalid email or incorrect password!"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/companies": {
        "get": {
          "tags": [
            "companies"
          ],
          "summary": "Create a new company",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "token",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "404": {
              "description": "Company not found!"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        },
        "post": {
          "tags": [
            "companies"
          ],
          "summary": "Create a new company",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "token",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "body",
              "description": "the company that will be added",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Company"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "201 Created a new company"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/companies/{companyId}": {
        "get": {
          "tags": [
            "companies"
          ],
          "summary": "Get a company",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "token",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "companyId",
              "description": "ID of company to get",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "404": {
              "description": "Company not found!"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        },
        "put": {
          "tags": [
            "companies"
          ],
          "summary": "Update an existing company",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "token",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "companyId",
              "description": "ID of company to update",
              "required": true,
              "type": "integer",
              "format": "int64"
            },
            {
              "in": "body",
              "name": "body",
              "description": "the company that will be edited",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Company"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Update a company"
            },
            "404": {
              "description": "Company not found!"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        },
        "delete": {
          "tags": [
            "companies"
          ],
          "summary": "Remove an existing company",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "token",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "companyId",
              "description": "ID of company to remove",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Company Removed Successfully!"
            },
            "404": {
              "description": "Company not found!"
            },
            "500": {
              "description": "Bad Request"
            }
          }
        }
      }
    },
    "definitions": {
      "Auth": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "xml": {
          "name": "Auth"
        }
      },
      "Company": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "cnpj": {
            "type": "string"
          }
        },
        "xml": {
          "name": "Company"
        }
      }
    },
    "externalDocs": {
      "description": "Find out more about Swagger",
      "url": "http://swagger.io"
    }
  }

  export default swaggerDocument;
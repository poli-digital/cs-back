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
      "description": "Everything about Companies"
    },
    {
      "name": "users",
      "description": "Everything about Users"
    },
    {
      "name": "plugins",
      "description": "Everything about plugins"
    },
    {
      "name": "configPlugins",
      "description": "Everything about configPlugins"
    }
  ],
  "schemes": [
    "http",
    "https"
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
                "description": "Return Token that will be used to make the other requests.",
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
        "summary": "Get list of companies",
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
            "description": "Companies not found!"
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
        "summary": "Get a specific company",
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
        "summary": "Update an specific company",
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
        "summary": "Remove an specific company",
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
    },
    "/users": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "Get list of users",
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
            "description": "Users not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "post": {
        "tags": [
          "users"
        ],
        "summary": "Create a new user",
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
            "description": "the user that will be added",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "201 Created a new user"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/users/{userId}": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "Get an user specific",
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
            "name": "userId",
            "description": "ID of user to get",
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
            "description": "User not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "put": {
        "tags": [
          "users"
        ],
        "summary": "Update a specific user",
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
            "name": "userId",
            "description": "ID of user to update",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "the user that will be edited",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Update an user"
          },
          "404": {
            "description": "User not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "delete": {
        "tags": [
          "users"
        ],
        "summary": "Remove a specific user",
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
            "name": "userId",
            "description": "ID of user to remove",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "User Removed Successfully!"
          },
          "404": {
            "description": "User not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/plugins": {
      "get": {
        "tags": [
          "plugins"
        ],
        "summary": "Get list of plugins",
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
            "description": "Plugins not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/configPlugins": {
      "get": {
        "tags": [
          "configPlugins"
        ],
        "summary": "Get list of configPlugins",
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
            "description": "configPlugins not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "post": {
        "tags": [
          "configPlugins"
        ],
        "summary": "Create a new configPlugin",
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
            "description": "the configPlugin that will be added",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ConfigPlugin"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "201 Created a new configPlugin"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/configPlugins/{configPluginId}": {
      "get": {
        "tags": [
          "configPlugins"
        ],
        "summary": "Get a configPlugin specific",
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
            "name": "configPluginId",
            "description": "ID of configPlugin to get",
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
            "description": "configPlugin not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "put": {
        "tags": [
          "configPlugins"
        ],
        "summary": "Update a specific configPlugin",
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
            "name": "configPluginId",
            "description": "ID of configPlugin to update",
            "required": true,
            "type": "integer",
            "format": "int64"
          },
          {
            "in": "body",
            "name": "body",
            "description": "the configPlugin that will be edited",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ConfigPlugin"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Update a configPlugin"
          },
          "404": {
            "description": "configPlugin not found!"
          },
          "500": {
            "description": "Bad Request"
          }
        }
      },
      "delete": {
        "tags": [
          "configPlugins"
        ],
        "summary": "Remove a specific configPlugin",
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
            "name": "configPluginId",
            "description": "ID of configPlugin to remove",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "configPlugin Removed Successfully!"
          },
          "404": {
            "description": "configPlugin not found!"
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
    },
    "User": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "blocked": {
          "type": "boolean",
          "default": false
        },
        "role_id": {
          "type": "integer"
        },
        "company_id": {
          "type": "integer"
        }
      },
      "xml": {
        "name": "User"
      }
    },
    "ConfigPlugin": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        },
        "visible": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "use_accordion": {
          "type": "boolean",
          "default": false
        },
        "field_id": {
          "type": "boolean",
          "default": false
        },
        "field_activity": {
          "type": "boolean",
          "default": false
        },
        "field_title": {
          "type": "boolean",
          "default": false
        },
        "field_notes": {
          "type": "boolean",
          "default": false
        },
        "field_creation": {
          "type": "boolean",
          "default": false
        },
        "field_owner": {
          "type": "boolean",
          "default": false
        },
        "field_stage": {
          "type": "boolean",
          "default": false
        },
        "field_funnel": {
          "type": "boolean"
        },
        "field_status": {
          "type": "boolean",
          "default": false
        },
        "field_id_contact": {
          "type": "boolean",
          "default": false
        },
        "field_name": {
          "type": "boolean",
          "default": false
        },
        "field_number": {
          "type": "boolean",
          "default": false
        },
        "field_company": {
          "type": "boolean",
          "default": false
        },
        "field_talk": {
          "type": "boolean",
          "default": false
        },
        "company_id": {
          "type": "integer"
        },
        "plugin_id": {
          "type": "integer"
        }
      },
      "xml": {
        "name": "ConfigPlugin"
      }
    }
  }
}

  export default swaggerDocument;
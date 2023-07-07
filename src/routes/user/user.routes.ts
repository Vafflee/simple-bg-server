import { FastifyInstance } from "fastify";
import { authUserHandler, getUsersHandler, registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

export async function userRoutes(server: FastifyInstance) {

  server.get('/', {
    preHandler: [
      server.auth
    ],
    schema: {
      response: {
        200: $ref('getUsersResponseSchema')
      }
    }
  }, getUsersHandler)

  server.post('/', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserResponseSchema')
      }
    }
  }, registerUserHandler);

  server.post('/auth', {
    schema: {
      body: $ref('authUserInputSchema'),
      response: {
        200: $ref('authUserResponseSchema')
      }
    }
  }, authUserHandler)
}
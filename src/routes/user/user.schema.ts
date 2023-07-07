import { Role } from '@prisma/client';
import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userBase = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  username: z.
    string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
  displayName: z.string({
    invalid_type_error: 'Display name must be a string'
  }),
}

const userResponse = {
  id: z.number(),
  ...userBase,
  avatarUrl: z.string(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
}

const createUserSchema = z.object({
  ...userBase,
  password: z.
    string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
})
export type CreateUserInput = z.infer<typeof createUserSchema>

const createUserResponseSchema = z.object(userResponse)
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>

const authUserInputSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.
    string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
}) 
export type AuthUserInput = z.infer<typeof authUserInputSchema>

const authUserResponseSchema = z.object({
  accessToken: z.string()
})
export type AuthUserResponse = z.infer<typeof authUserResponseSchema>

const getUsersResponseSchema = z.object({
  users: z.object(userResponse).array()
})
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,

  authUserInputSchema,
  authUserResponseSchema,
  
  getUsersResponseSchema
})
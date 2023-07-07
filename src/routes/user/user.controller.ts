import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, getUsers } from "./user.service";
import { AuthUserInput, CreateUserInput, GetUsersResponse } from "./user.schema";
import { validatePassword } from "../../utils/password/validatePassword";
import { server } from "../..";

export async function registerUserHandler(request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply) {

  const body = request.body;

  try {
    const user = await createUser(body); 
    return reply.code(201).send(user)

  } catch (error) {
    console.error(error)
    reply.code(500).send(error)
  }
}

export async function authUserHandler(request: FastifyRequest<{ Body: AuthUserInput}>, reply: FastifyReply) {

  const body = request.body;
  try {
    const user = await findUserByEmail(body.email)
  
    if (!user) {
      return reply.code(401).send({
        message: 'Invalid email or password'
      })
    }
  
    const isPassCorrect = validatePassword(body.password, user.password);
  
    if (!isPassCorrect) {
      return reply.code(401).send({
        message: 'Invalid email or password'
      })
    }
  
    const {password, ...rest} = user;
  
    return {
      accessToken: server.jwt.sign(rest)
    }
    
  } catch (error) {
    reply.code(500).send(error)
  }

}

export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await getUsers();
    return { users };
    
  } catch (error) {
    console.error(error)
    reply.code(500).send(error)
  }
}
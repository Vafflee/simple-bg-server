import { config } from 'dotenv';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt'

import { userRoutes } from './routes/user/user.routes';
import { userSchemas } from './routes/user/user.schema';

declare module "fastify" {
  export interface FastifyInstance {
    auth: any
  }
}

config();
const port = Number.parseInt(process.env.PORT ?? '5000');

export const server = Fastify({
  logger: true
})

// Register plugins
server.register(jwt, {
  secret: 'q3g407ry94tum-u383u-t8nv495q93n9t-cwe9r'
})
server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
})

// Register schemas
for (const schema of userSchemas) {
  server.addSchema(schema);
}

server.get('/healthcheck', (request, reply) => {
  reply.code(200).send({
    status: 'ok'
  })
})

server.register(userRoutes, {
  prefix: '/api/users'
});


server.listen({ port }, function (err, address) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log('Server is listening on: ' + address)
})
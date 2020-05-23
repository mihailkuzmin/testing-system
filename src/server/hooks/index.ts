import { ServerResponse } from 'http'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Roles } from '@common/typings/user'
import { Response } from '@common/typings'
import { AuthService } from '@services/AuthService'

export const allowFor = (allowedFor: Roles[]) => {
  return async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
    const id = request.session.userId
    const user = await AuthService.getUserInfoById(id)

    const allowed = user !== null && allowedFor.includes(user.role.name)
    if (!allowed) {
      const response: Response<void> = { message: 'Unauthorized' }
      return reply.code(401).send(response)
    }
  }
}

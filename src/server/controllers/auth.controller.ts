import { Controller } from '@typings'
import { Response } from '@common/typings'
import { Credentials, UserInfo } from '@common/typings/auth'
import { Role, Roles } from '@common/typings/user'
import { AuthService } from '@services/AuthService'
import { allowFor } from '@hooks'

export const authController: Controller = (app, options, done) => {
  app.route({
    method: 'POST',
    url: '/login',
    handler: async (request, reply) => {
      const credentials: Credentials = request.body

      const { error, user } = await AuthService.login(credentials)
      if (error || !user) {
        const response: Response<void> = { message: 'Неверные данные' }
        return reply.status(401).send(response)
      }

      request.session.userId = user.id
      const response: Response<UserInfo> = { payload: user }

      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/check',
    preValidation: allowFor([Roles.Student, Roles.Moderator, Roles.Administrator]),
    handler: async (request, reply) => {
      const id = request.session.userId
      const user = await AuthService.getUserInfoById(id)

      const response: Response<UserInfo> = { payload: user! }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/logout',
    preValidation: allowFor([Roles.Student, Roles.Moderator, Roles.Administrator]),
    handler: async (request, reply) => {
      request.destroySession((err) => {
        if (err) {
          const response: Response<void> = { message: 'Произошла ошибка' }
          return reply.code(500).send(response)
        }

        reply.send({})
      })
    },
  })

  app.route({
    method: 'GET',
    url: '/roles',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const roles = await AuthService.getRoles()

      const response: Response<Role[]> = { payload: roles }

      reply.send(response)
    },
  })

  done()
}

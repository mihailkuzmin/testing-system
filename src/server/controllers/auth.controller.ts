import { Controller } from '@typings'
import { Response } from '@common/typings'
import { UserInfo, Credentials } from '@common/typings/auth'
import { Role } from '@common/typings/user'
import { AuthService } from '@services/AuthService'

export const authController: Controller = (app, options, done) => {
  app.post('/login', async (request, reply) => {
    const credentials: Credentials = request.body

    const { error, user } = await AuthService.login(credentials)
    if (error || !user) {
      return reply.status(401).send({})
    }

    request.session.userId = user.id
    const response: Response<UserInfo> = { payload: user }

    reply.send(response)
  })

  app.get('/check', async (request, reply) => {
    const id = request.session.userId
    if (!id) {
      return reply.code(401).send({})
    }

    const user = await AuthService.getUserInfoById(id)

    if (!user) {
      return reply.code(401).send({})
    }

    const response: Response<UserInfo> = { payload: user }
    reply.send(response)
  })

  app.get('/logout', async (request, reply) => {
    const response: Response<void> = {}
    if (request.session.userId) {
      request.destroySession((err) => {
        if (err) {
          response.message = 'Произошла ошибка'
          return reply.code(500).send(response)
        }
        return reply.send(response)
      })
    } else {
      return reply.code(500).send(response)
    }
  })

  app.get('/role', async (request, reply) => {
    const roles = await AuthService.getRoles()

    const response: Response<Role[]> = { payload: roles }

    reply.send(response)
  })

  done()
}

import { Controller } from '@typings'
import { Response } from '@common/typings'
import { UserInfo, Credentials } from '@common/typings/auth'
import { AuthService } from '@services/AuthService'
import { Hasher } from '@lib/Hasher'
import { Role } from '@common/typings/student'

const authService = new AuthService(new Hasher())

export const authController: Controller = (app, options, done) => {
  app.post('/login', async (request, reply) => {
    const credentials: Credentials = request.body

    const { error, user } = await authService.login(credentials)
    if (error) {
      return reply.status(401).send()
    }

    if (user) {
      request.session.userId = user.id
    }
    const response: Response<UserInfo> = { payload: user }

    reply.send(response)
  })

  app.get('/check', async (request, reply) => {
    if (!request.session.userId) {
      return reply.code(401).send({})
    }

    const id = request.session.userId
    const user = await authService.getUserInfoById(id)
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
    const roles = await authService.getRoles()

    const response: Response<Role[]> = { payload: roles }

    reply.send(response)
  })

  done()
}

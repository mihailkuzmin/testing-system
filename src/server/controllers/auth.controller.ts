import { Controller } from '@typings'
import { Response } from '@common/typings'
import { UserInfo, Credentials } from '@common/typings/auth'
import { AuthService } from '@services/AuthService'
import { Hasher } from '@lib/Hasher'

const authService = new AuthService(new Hasher())

export const authController: Controller = (app, options, done) => {
  app.post('/login', async (request, reply) => {
    const credentials: Credentials = request.body

    const { error, user } = await authService.login(credentials)
    if (error) {
      reply.status(401)
    }

    if (user) {
      request.session.userId = user.id
    }
    const response: Response<UserInfo> = { payload: user }

    reply.send(response)
  })

  app.get('/check', async (request, reply) => {
    if (!request.session.userId) {
      reply.status(401)
    }

    const id = request.session.userId
    const user = await authService.getUserInfoById(id)
    const response: Response<UserInfo> = { payload: user }

    reply.send(response)
  })

  app.get('/logout', async (request, reply) => {
    if (request.session.userId) {
      request.destroySession((err) => {
        if (err) {
          reply.status(500)
        } else {
          reply.status(200)
        }
      })
    }

    reply.status(500)
  })

  done()
}

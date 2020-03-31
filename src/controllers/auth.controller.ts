import { IController } from '../typings/controller'

export const authController: IController = (app, options, done) => {
  app.post('/signin', async (request, reply) => {
    const { login, password } = request.body

    reply.send({ login, password })
  })

  app.get('/check', async (request, reply) => {
    reply.send({ ok: true })
  })

  done()
}

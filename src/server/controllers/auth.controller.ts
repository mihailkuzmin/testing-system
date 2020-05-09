import { Controller } from '@typings'

export const authController: Controller = (app, options, done) => {
  app.post('/signin', async (request, reply) => {
    const { login, password } = request.body

    reply.send({ login, password })
  })

  app.get('/check', async (request, reply) => {
    reply.send({ ok: true })
  })

  done()
}

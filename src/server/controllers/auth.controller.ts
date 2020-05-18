import { Controller } from '@typings'

export const authController: Controller = (app, options, done) => {
  app.post('/login', async (request, reply) => {
    reply.send()
  })

  app.get('/check', async (request, reply) => {
    reply.send()
  })

  app.get('/logout', async (request, reply) => {
    reply.send()
  })

  done()
}

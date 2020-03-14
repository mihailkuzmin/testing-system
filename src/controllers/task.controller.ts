import { IController } from '../typings/controller'

export const taskController: IController = (app, options, done) => {
  app.get('/getAll', async (request, reply) => {
    reply.send({ message: 'getAll stub' })
  })

  done()
}

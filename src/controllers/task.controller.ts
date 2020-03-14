import { IController } from '../typings/controller'
import { Task } from '../models'

export const taskController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Task.getAll()
    reply.send(result)
  })

  done()
}

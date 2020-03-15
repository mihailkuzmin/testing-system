import { IController } from '../typings/controller'
import { Group } from '../models'

export const groupController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Group.getAll()
    reply.send(result)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params
    const result = await Group.getById(id)
    reply.send(result)
  })

  done()
}

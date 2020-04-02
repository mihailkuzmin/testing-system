import { IController, Response } from '../../typings'
import { Group } from '../../models'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const groupController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Group.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const { name } = request.body

    const group = new Group(name)
    const result = await group.save()

    reply.send(result)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params
    const result = await Group.getById(id)
    reply.send(result)
  })

  done()
}

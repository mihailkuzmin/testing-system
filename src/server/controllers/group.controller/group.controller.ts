import { Controller, Response } from '../../typings'
import { CreateGroup, UpdateGroup, GroupId } from '../../typings/group'
import { Group } from '../../models'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const groupController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Group.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newGroup: CreateGroup = request.body

    const result = await Group.create(newGroup)

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    const result = await Group.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    const result = await Group.removeById(id)

    const response: Response<Payload.RemoveById> = { payload: result, message: Messages.RemoveById }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const group: UpdateGroup = request.body

    const result = await Group.update(group)

    const response: Response<Payload.Update> = { payload: result, message: Messages.Update }
    reply.send(response)
  })

  done()
}

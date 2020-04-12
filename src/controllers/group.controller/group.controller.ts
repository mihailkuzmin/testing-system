import { IController, Response } from '../../typings'
import { CreateGroup } from '../../typings/group'
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
    const newGroup: CreateGroup = request.body

    const result = await Group.create(newGroup)

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: number = request.params.id

    const result = await Group.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  done()
}

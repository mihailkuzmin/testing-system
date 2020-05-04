import { IController, Response } from '../../typings'
import { Work } from '../../models'
import { WorkId } from '../../typings/work'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const workController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Work.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await Work.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await Work.removeById(id)

    const response: Response<Payload.RemoveById> = { payload: result, message: Messages.RemoveById }
    reply.send(response)
  })

  done()
}

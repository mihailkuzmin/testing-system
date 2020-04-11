import { IController, Response } from '../../typings'
import { Task } from '../../models'
import { CreateTask } from '../../typings/task'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const taskController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Task.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newTask: CreateTask = request.body

    const result = await Task.create(newTask)

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: number = request.params.id

    const result = await Task.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  done()
}

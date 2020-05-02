import { IController, Response } from '../../typings'
import { Task } from '../../models'
import { CreateTask, UpdateTask, TaskId } from '../../typings/task'
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
    const id: TaskId = request.params.id

    const result = await Task.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  app.get('/tests/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const tests = await Task.getTestsById(id)

    const response: Response<Payload.GetTestsById> = {
      payload: tests,
      message: Messages.GetTestsById,
    }
    reply.send(response)
  })

  app.get('/topic', async (request, reply) => {
    const topics = await Task.getTopics()

    const response: Response<Payload.GetTopics> = {
      payload: topics,
      message: Messages.GetTopics,
    }

    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const task: UpdateTask = request.body

    const result = await Task.update(task)

    const response: Response<Payload.Update> = { payload: result, message: Messages.Update }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const result = await Task.removeById(id)

    const response: Response<Payload.RemoveById> = { payload: result, message: Messages.RemoveById }
    reply.send(response)
  })

  done()
}

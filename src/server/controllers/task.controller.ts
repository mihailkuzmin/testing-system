import { TaskRepository } from '@repositories'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { Task, CreateTask, UpdateTask, TaskId, Topic, Test } from '@common/typings/task'

export const taskController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []

    const result = await TaskRepository.getAll()

    for (const field of fieldsForExclude) {
      for (const task of result) {
        delete task[field]
      }
    }

    const response: Response<Task[]> = { payload: result }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []
    const id: TaskId = request.params.id

    const task = await TaskRepository.getById(id)

    for (const field of fieldsForExclude) {
      delete task[field]
    }

    const response: Response<Task> = { payload: task }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newTask: CreateTask = request.body

    await TaskRepository.create(newTask)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.get('/:id/test', async (request, reply) => {
    const id: TaskId = request.params.id

    const tests = await TaskRepository.getTestsById(id)

    const response: Response<Test[]> = { payload: tests }
    reply.send(response)
  })

  app.get('/topic', async (request, reply) => {
    const topics = await TaskRepository.getTopics()

    const response: Response<Topic[]> = { payload: topics }

    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const task: UpdateTask = request.body

    await TaskRepository.update(task)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    await TaskRepository.removeById(id)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

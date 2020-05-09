import { TaskRepository } from '@repositories'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { Task, CreateTask, UpdateTask, TaskId, TaskPreview, Topic } from '@common/typings/task'

export const taskController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await TaskRepository.getAll()

    const response: Response<Task[]> = { payload: result, message: '' }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newTask: CreateTask = request.body

    const result = await TaskRepository.create(newTask)

    const response: Response<Task> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const result = await TaskRepository.getById(id)

    const response: Response<Task> = { payload: result, message: '' }
    reply.send(response)
  })

  app.get('/tests/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const tests = await TaskRepository.getTestsById(id)

    //TODO fix types
    const response: Response<Array<{ id: number; input: string; output: string }>> = {
      payload: tests,
      message: '',
    }
    reply.send(response)
  })

  app.get('/preview/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const taskPreview = await TaskRepository.getPreviewById(id)

    const response: Response<TaskPreview> = {
      payload: taskPreview,
      message: '',
    }
    reply.send(response)
  })

  app.get('/topic', async (request, reply) => {
    const topics = await TaskRepository.getTopics()

    const response: Response<Topic[]> = {
      payload: topics,
      message: '',
    }

    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const task: UpdateTask = request.body

    const result = await TaskRepository.update(task)

    const response: Response<Task> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: TaskId = request.params.id

    const result = await TaskRepository.removeById(id)

    const response: Response<Task> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

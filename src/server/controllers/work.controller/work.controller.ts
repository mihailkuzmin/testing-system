import { WorkRepository } from '@repositories'
import { Response } from '@common/typings'
import { Work, WorkId, CreateWork, UpdateWork } from '@common/typings/work'
import { Task } from '@common/typings/task'
import { Controller } from '@typings'

export const workController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await WorkRepository.getAll()

    const response: Response<Work[]> = { payload: result }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await WorkRepository.getById(id)

    const response: Response<Work> = { payload: result }
    reply.send(response)
  })

  app.get('/:id/task', async (request, reply) => {
    const id: WorkId = request.params.id
    const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []

    const result = await WorkRepository.getTasksOfWork(id)

    for (const field of fieldsForExclude) {
      for (const task of result) {
        delete task[field]
      }
    }

    const response: Response<Task[]> = { payload: result }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newWork: CreateWork = request.body

    await WorkRepository.create(newWork)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const updateWork: UpdateWork = request.body

    await WorkRepository.update(updateWork)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    await WorkRepository.removeById(id)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

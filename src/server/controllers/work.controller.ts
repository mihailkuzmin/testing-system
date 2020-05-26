import { CreateWork, UpdateWork, Work, WorkId } from '@common/typings/work'
import { Task, TaskId } from '@common/typings/task'
import { Group } from '@common/typings/group'
import { Roles } from '@common/typings/user'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { WorkRepository } from '@repositories'
import { allowFor } from '@hooks'

export const workController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const result = await WorkRepository.getAll()

      const response: Response<Work[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      const result = await WorkRepository.getById(id)

      const response: Response<Work> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/tasks',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
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
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/groups',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      const result = await WorkRepository.getGroupsOfWork(id)

      const response: Response<Group[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/filterByTask/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: TaskId = request.params.id

      const result = await WorkRepository.getWorksWithTask(id)

      const response: Response<Work[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const newWork: CreateWork = request.body

      await WorkRepository.create(newWork)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'PUT',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const updateWork: UpdateWork = request.body

      await WorkRepository.update(updateWork)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      await WorkRepository.removeById(id)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  done()
}

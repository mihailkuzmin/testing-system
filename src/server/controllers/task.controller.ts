import { CreateTask, PLang, Task, TaskId, Test, Topic, UpdateTask } from '@common/typings/task'
import { Roles } from '@common/typings/user'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { TaskRepository } from '@repositories'
import { allowFor } from '@hooks'

export const taskController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []

      const result = await TaskRepository.getAll()

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
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []
      const id: TaskId = request.params.id

      const task = await TaskRepository.getById(id)

      for (const field of fieldsForExclude) {
        delete task[field]
      }

      const response: Response<Task> = { payload: task }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator]),
    handler: async (request, reply) => {
      const newTask: CreateTask = request.body

      await TaskRepository.create(newTask)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/tests',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: TaskId = request.params.id

      const tests = await TaskRepository.getTestsById(id)

      const response: Response<Test[]> = { payload: tests }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/topics',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator]),
    handler: async (request, reply) => {
      const topics = await TaskRepository.getTopics()

      const response: Response<Topic[]> = { payload: topics }

      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/plangs',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
      const langs = await TaskRepository.getPLanguages()

      const response: Response<PLang[]> = { payload: langs }

      reply.send(response)
    },
  })

  app.route({
    method: 'PUT',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const task: UpdateTask = request.body

      await TaskRepository.update(task)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: TaskId = request.params.id

      await TaskRepository.removeById(id)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  done()
}

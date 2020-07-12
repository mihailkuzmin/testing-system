import { CreateUser, Roles, UpdateUser, User, UserId } from '@common/typings/user'
import { AvailableWork, Work } from '@common/typings/work'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { UserRepository } from '@repositories'
import { allowFor } from '@hooks'
import { addToDate } from '@common/helpers'

export const userController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const result = await UserRepository.getAll()

      const response: Response<User[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: UserId = request.params.id

      const result = await UserRepository.getById(id)

      const response: Response<User> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/works',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
      const id: UserId = request.params.id

      const allWorksForUser = await UserRepository.getAvailableWorksForUser(id)
      const startedWorks = await UserRepository.getStartedWorks(id)

      const currentDate = new Date()

      const startedAndAvailable = startedWorks
        .filter((w) => {
          const startedAt = new Date(w.startedAt)
          const timeToComplete = new Date(w.timeToComplete)
          const endAt = addToDate(startedAt, {
            hours: timeToComplete.getHours(),
            minutes: timeToComplete.getMinutes(),
          })

          return currentDate < endAt
        })
        .map(({ startedAt, ...w }) => ({ ...w, started: true }))

      const notStarted = allWorksForUser.filter((w) => {
        return !startedWorks.find((s) => s.id === w.id)
      })

      const notStartedAndAvailable = notStarted
        .filter((w) => {
          const openAt = new Date(w.openAt)
          const closeAt = new Date(w.closeAt)

          return currentDate >= openAt && currentDate < closeAt
        })
        .map((w) => ({ ...w, started: false }))

      const response: Response<AvailableWork[]> = {
        payload: notStartedAndAvailable.concat(startedAndAvailable),
      }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const newStudent: CreateUser = request.body

      await UserRepository.create(newStudent)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'PUT',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const user: UpdateUser = request.body

      await UserRepository.update(user)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: UserId = request.params.id

      await UserRepository.removeById(id)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  done()
}

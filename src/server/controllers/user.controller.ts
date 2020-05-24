import { CreateUser, Roles, UpdateUser, User, UserId } from '@common/typings/user'
import { Work } from '@common/typings/work'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { UserRepository } from '@repositories'
import { allowFor } from '@hooks'

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

      const result = await UserRepository.getAvailableWorksById(id)

      const response: Response<Work[]> = { payload: result }
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

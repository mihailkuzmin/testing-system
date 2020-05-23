import { CreateGroup, Group, GroupId, UpdateGroup } from '@common/typings/group'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { GroupRepository } from '@repositories'
import { allowFor } from '@hooks'
import { Roles } from '@common/typings/user'

export const groupController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const result = await GroupRepository.getAll()

      const response: Response<Group[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: GroupId = request.params.id

      const result = await GroupRepository.getById(id)

      const response: Response<Group> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const newGroup: CreateGroup = request.body

      await GroupRepository.create(newGroup)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: GroupId = request.params.id

      await GroupRepository.removeById(id)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'PUT',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const group: UpdateGroup = request.body

      await GroupRepository.update(group)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  done()
}

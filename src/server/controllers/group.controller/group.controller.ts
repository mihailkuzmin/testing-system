import { Group, CreateGroup, UpdateGroup, GroupId } from '@common/typings/group'
import { Response } from '@common/typings'
import { Controller } from '../../typings'
import { GroupRepository } from '../../models'

export const groupController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await GroupRepository.getAll()

    const response: Response<Group[]> = { payload: result, message: '' }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    const result = await GroupRepository.getById(id)

    const response: Response<Group> = { payload: result, message: '' }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newGroup: CreateGroup = request.body

    const result = await GroupRepository.create(newGroup)

    const response: Response<Group> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    const result = await GroupRepository.removeById(id)

    const response: Response<Group> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const group: UpdateGroup = request.body

    const result = await GroupRepository.update(group)

    const response: Response<Group> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

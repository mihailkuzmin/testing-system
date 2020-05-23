import { GroupRepository } from '@repositories'
import { Group, CreateGroup, UpdateGroup, GroupId } from '@common/typings/group'
import { Response } from '@common/typings'
import { Controller } from '@typings'

export const groupController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await GroupRepository.getAll()

    const response: Response<Group[]> = { payload: result }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    const result = await GroupRepository.getById(id)

    const response: Response<Group> = { payload: result }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newGroup: CreateGroup = request.body

    await GroupRepository.create(newGroup)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: GroupId = request.params.id

    await GroupRepository.removeById(id)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const group: UpdateGroup = request.body

    await GroupRepository.update(group)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

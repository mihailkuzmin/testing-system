import { User, CreateUser, UpdateUser, UserId } from '@common/typings/user'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { UserRepository } from '@repositories'

export const userController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await UserRepository.getAll()

    const response: Response<User[]> = { payload: result }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: UserId = request.params.id

    const result = await UserRepository.getById(id)

    const response: Response<User> = { payload: result }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newStudent: CreateUser = request.body

    await UserRepository.create(newStudent)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const user: UpdateUser = request.body

    await UserRepository.update(user)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: UserId = request.params.id

    await UserRepository.removeById(id)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

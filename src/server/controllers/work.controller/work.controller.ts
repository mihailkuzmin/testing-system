import { WorkRepository } from '@repositories'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { Work, WorkId } from '@common/typings/work'

export const workController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await WorkRepository.getAll()

    const response: Response<Work[]> = { payload: result, message: '' }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await WorkRepository.getById(id)

    const response: Response<Work> = { payload: result, message: '' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await WorkRepository.removeById(id)

    const response: Response<Work> = { payload: result, message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

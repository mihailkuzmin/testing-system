import { IController } from '../typings/controller'
import { IWork, WorkId } from '../typings/work'
import { Work } from '../models'

export const workController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Work.getAll()
    reply.send(result)
  })

  app.post('/', async (request, reply) => {
    const newWork: IWork = request.body

    const result = await Work.create(newWork)

    reply.send(result)
  })

  app.get('/:id', async (request, reply) => {
    const id: WorkId = request.params.id

    const result = await Work.getById(id)

    reply.send(result)
  })

  done()
}

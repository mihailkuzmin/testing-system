import { IController } from '../typings/controller'
import { Work } from '../models'

export const workController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Work.getAll()
    reply.send(result)
  })

  app.post('/', async (request, reply) => {
    const { name, openAt, closeAt } = request.body

    const work = new Work(name, openAt, closeAt)
    const result = await work.save()

    reply.send(result)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params
    const result = await Work.getById(id)
    reply.send(result)
  })

  done()
}

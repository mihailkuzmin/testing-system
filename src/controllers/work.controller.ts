import { IController } from '../typings/controller'
import { Work } from '../models'

export const workController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Work.getAll()
    reply.send(result)
  })

  done()
}

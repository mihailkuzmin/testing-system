import { IController } from '../typings/controller'
import { Student } from '../models'

export const studentController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Student.getAll()
    reply.send(result)
  })

  done()
}

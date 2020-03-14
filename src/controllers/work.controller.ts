import { IController } from '../typings/controller'
import {Work} from '../models'

export const workController: IController = (app, options, done) => {
  app.get('/getAll', async (request, reply) => {
    const result = await Work.getAll()
    reply.send(result)
  })

  done()
}

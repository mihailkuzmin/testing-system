import { IController, Response } from '../../typings'
import { Student } from '../../models'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const studentController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Student.getAll()
    reply.send(result)
  })

  app.post('/', async (request, reply) => {
    const { name, group, login, password } = request.body

    const student = new Student(name, group, login, password)
    const result = await student.save()

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params
    const result = await Student.getById(id)
    reply.send(result)
  })

  done()
}

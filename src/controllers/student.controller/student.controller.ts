import { IController, Response } from '../../typings'
import { Student } from '../../models'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const studentController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Student.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params

    const result = await Student.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const { lastName, firstName, patronymic, bookNumber, group, login, password } = request.body
    
    const student = new Student(lastName, firstName, patronymic, bookNumber, group, login, password)
    const result = await student.save()

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = request.params

    const result = await Student.removeById(id)

    const response: Response<Payload.RemoveById> = { payload: result, message: Messages.RemoveById }
    reply.send(response)
  })

  done()
}

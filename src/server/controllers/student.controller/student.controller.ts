import { Controller, Response } from '../../typings'
import { Student } from '../../models'
import { CreateStudent, UpdateStudent, StudentId } from '../../typings/student'
import * as Payload from './typings/payloads'
import * as Messages from './typings/messages'

export const studentController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Student.getAll()

    const response: Response<Payload.GetAll> = { payload: result, message: Messages.GetAll }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: StudentId = request.params.id

    const result = await Student.getById(id)

    const response: Response<Payload.GetById> = { payload: result, message: Messages.GetById }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newStudent: CreateStudent = request.body

    const result = await Student.create(newStudent)

    const response: Response<Payload.Create> = { payload: result, message: Messages.Create }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const user: UpdateStudent = request.body

    const result = await Student.update(user)

    const response: Response<Payload.Update> = { payload: result, message: Messages.Update }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: StudentId = request.params.id

    const result = await Student.removeById(id)

    const response: Response<Payload.RemoveById> = { payload: result, message: Messages.RemoveById }
    reply.send(response)
  })

  done()
}

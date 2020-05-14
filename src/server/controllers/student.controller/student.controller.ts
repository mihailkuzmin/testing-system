import { StudentRepository } from '@repositories'
import { Student, CreateStudent, UpdateStudent, StudentId } from '@common/typings/student'
import { Response } from '@common/typings'
import { Controller } from '@typings'

export const studentController: Controller = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await StudentRepository.getAll()

    const response: Response<Student[]> = { payload: result }
    reply.send(response)
  })

  app.get('/:id', async (request, reply) => {
    const id: StudentId = request.params.id

    const result = await StudentRepository.getById(id)

    const response: Response<Student> = { payload: result }
    reply.send(response)
  })

  app.post('/', async (request, reply) => {
    const newStudent: CreateStudent = request.body

    await StudentRepository.create(newStudent)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.put('/', async (request, reply) => {
    const user: UpdateStudent = request.body

    await StudentRepository.update(user)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  app.delete('/:id', async (request, reply) => {
    const id: StudentId = request.params.id

    await StudentRepository.removeById(id)

    const response: Response<void> = { message: 'Выполнено' }
    reply.send(response)
  })

  done()
}

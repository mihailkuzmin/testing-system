import { IController } from '../typings/controller'
import { Task } from '../models'

export const taskController: IController = (app, options, done) => {
  app.get('/', async (request, reply) => {
    const result = await Task.getAll()
    reply.send(result)
  })

  app.post('/', async (request, reply) => {
    const {
      description,
      inputFileName,
      outputFileName,
      exampleInputFileName,
      exampleOutputFileName,
      correctOutputFileName,
    } = request.body

    const task = new Task(
      description,
      inputFileName,
      outputFileName,
      exampleInputFileName,
      exampleOutputFileName,
      correctOutputFileName,
    )
    const result = await task.save()

    reply.send(result)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params
    const result = await Task.getById(id)
    reply.send(result)
  })

  done()
}

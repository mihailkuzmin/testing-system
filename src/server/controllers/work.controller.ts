import {
  BeginWork,
  CreateWork,
  TaskExecResult,
  UpdateWork,
  Work,
  WorkId,
} from '@common/typings/work'
import { ExecResult, SubmitTask, Task, TaskId } from '@common/typings/task'
import { Group } from '@common/typings/group'
import { Roles } from '@common/typings/user'
import { Response } from '@common/typings'
import { Controller } from '@typings'
import { TaskRepository, WorkRepository } from '@repositories'
import { allowFor } from '@hooks'
import { UserId } from '@common/typings/auth'
import { Runner } from '@lib/Runner'

export const workController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const result = await WorkRepository.getAll()

      const response: Response<Work[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      const result = await WorkRepository.getById(id)

      const response: Response<Work> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/tasks',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id
      const fieldsForExclude: Array<keyof Task> = request.query.exclude ?? []

      const result = await WorkRepository.getTasksOfWork(id)

      for (const field of fieldsForExclude) {
        for (const task of result) {
          delete task[field]
        }
      }

      const response: Response<Task[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/:id/groups',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      const result = await WorkRepository.getGroupsOfWork(id)

      const response: Response<Group[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/filterByTask/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: TaskId = request.params.id

      const result = await WorkRepository.getWorksWithTask(id)

      const response: Response<Work[]> = { payload: result }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const newWork: CreateWork = request.body

      await WorkRepository.create(newWork)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'PUT',
    url: '/',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const updateWork: UpdateWork = request.body

      await WorkRepository.update(updateWork)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const id: WorkId = request.params.id

      await WorkRepository.removeById(id)

      const response: Response<void> = { message: 'Выполнено' }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/begin/:id',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
      const workId: WorkId = request.params.id
      const userId: UserId = request.session.userId
      const startedAt = new Date().toISOString()

      const beginWork = await WorkRepository.beginWork({ workId, userId, startedAt })

      const response: Response<BeginWork> = { payload: beginWork }
      reply.send(response)
    },
  })

  app.route({
    method: 'POST',
    url: '/begin/submittask',
    preValidation: allowFor([Roles.Administrator, Roles.Moderator, Roles.Student]),
    handler: async (request, reply) => {
      const task: SubmitTask = request.body

      const { runner, error } = Runner.create(task.plang.name)

      if (!runner) {
        const response: Response<ExecResult[]> = {
          payload: [{ ok: false, runtimeError: true, output: error! }],
        }
        return reply.send(response)
      }

      const tests = await TaskRepository.getTestsById(task.taskId)
      const result = await runner.run(task.code, tests)

      const passedTestsCount = result.reduce((count, r) => (r.ok ? count + 1 : count), 0)

      const execResult: TaskExecResult = {
        code: task.code,
        testsCount: tests.length,
        testsPassed: passedTestsCount,
        languageId: task.plang.id,
        userId: task.userId,
        taskId: task.taskId,
        workId: task.workId,
      }

      await WorkRepository.saveExecResult(execResult)

      const response: Response<ExecResult[]> = { payload: result }
      reply.send(response)
    },
  })

  done()
}

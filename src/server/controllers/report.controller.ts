import { Controller } from '@typings'
import { allowFor } from '@hooks'
import { Roles, User, UserId } from '@common/typings/user'
import { Response } from '@common/typings'
import { Work, WorkId } from '@common/typings/work'
import { ReportRepository } from '@repositories'
import { Group, GroupId } from '@common/typings/group'
import { TaskResult } from '@common/typings/report'
import { TaskId } from '@common/typings/task'

export const reportController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/work',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const works = await ReportRepository.getAllWorksWithResults()

      const response: Response<Work[]> = { payload: works }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/work/:id/group',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const workId: WorkId = request.params.id
      const groups = await ReportRepository.getAllGroupsWithWorkResults(workId)

      const response: Response<Group[]> = { payload: groups }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/work/:workId/group/:groupId/user',
    preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const workId: WorkId = request.params.workId
      const groupId: GroupId = request.params.groupId

      const users = await ReportRepository.getUsersOfGroupWithResults(workId, groupId)

      const response: Response<User[]> = { payload: users }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/work/:workId/group/:groupId/user/:userId',
    // preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const workId: WorkId = request.params.workId
      const userId: UserId = request.params.userId

      const tasksResults = await ReportRepository.getUserTasksResults(workId, userId)

      const tasksIds = new Set<TaskId>()
      const tasksWithBestsResults: TaskResult[] = []

      tasksResults.forEach((t) => tasksIds.add(t.id))
      tasksIds.forEach((id) => {
        const taskResults = tasksResults.filter((t) => t.id === id)

        const taskWithBestResult = taskResults.reduce((prev, next) => {
          if (prev.testsPassed === next.testsPassed) {
            return next.id > prev.id ? next : prev
          }

          return next.testsPassed > prev.testsPassed ? next : prev
        })

        tasksWithBestsResults.push(taskWithBestResult)
      })

      const response: Response<TaskResult[]> = { payload: tasksWithBestsResults }
      reply.send(response)
    },
  })

  done()
}

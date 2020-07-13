import { Controller } from '@typings'
import { allowFor } from '@hooks'
import { Roles, User } from '@common/typings/user'
import { Response } from '@common/typings'
import { Work, WorkId } from '@common/typings/work'
import { ReportRepository } from '@repositories'

export const reportController: Controller = (app, options, done) => {
  app.route({
    method: 'GET',
    url: '/work',
    // preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const works = await ReportRepository.getAllWorksWithResults()

      const response: Response<Work[]> = { payload: works }
      reply.send(response)
    },
  })

  app.route({
    method: 'GET',
    url: '/work/:id/users',
    // preValidation: allowFor([Roles.Administrator]),
    handler: async (request, reply) => {
      const workId: WorkId = request.params.id
      const users = await ReportRepository.getAllUsersWithWorkResults(workId)

      const response: Response<User[]> = { payload: users }
      reply.send(response)
    },
  })

  done()
}

import { db } from '@db'
import { Work, WorkId } from '@common/typings/work'
import { Report } from '@common/typings/report'
import { User, UserId } from '@common/typings/user'

export class ReportRepository {
  static async getAllWorksWithResults(): Promise<Work[]> {
    const works = await db.query(
      `
        SELECT DISTINCT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt", W.time_to_complete as "timeToComplete"
        FROM TaskResult TR, Work W
        WHERE (TR.work_id = W.id)
      `,
    )

    return works
  }

  static async getAllUsersWithWorkResults(id: WorkId): Promise<User[]> {
    const users = await db.query(
      `
      SELECT DISTINCT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        jsonb_build_object('id', G.id, 'name', G.name) as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, TaskResult TR, StudentGroup G, Role R
      WHERE (TR.work_id = %L and TR.user_id = S.id and G.id = S.group_id and R.id = S.role_id)
    `,
      id,
    )

    return users
  }
}

import { db } from '@db'
import { Work, WorkId } from '@common/typings/work'
import { TaskResult } from '@common/typings/report'
import { User, UserId } from '@common/typings/user'
import { Group, GroupId } from '@common/typings/group'

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

  static async getAllGroupsWithWorkResults(id: WorkId): Promise<Group[]> {
    const groups = await db.query(
      `
      SELECT DISTINCT
        G.id, G.name
      FROM Student S, TaskResult TR, StudentGroup G
      WHERE (TR.work_id = %L and TR.user_id = S.id and G.id = S.group_id)
    `,
      id,
    )

    return groups
  }

  static async getUsersOfGroupWithResults(workId: WorkId, groupId: GroupId): Promise<User[]> {
    const users = await db.query(
      `
      SELECT DISTINCT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        jsonb_build_object('id', G.id, 'name', G.name) as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, TaskResult TR, StudentGroup G, Role R
      WHERE (TR.work_id = %L and TR.user_id = S.id and G.id = S.group_id and G.id = %L and R.id = S.role_id)
    `,
      workId,
      groupId,
    )

    return users
  }

  static async getUserTasksResults(workId: WorkId, userId: UserId): Promise<TaskResult[]> {
    const tasksResults = await db.query(
      `
      SELECT
        TR.id as "id", work_id as "workId", task_id as "taskId", user_id as "userId", code, tests_passed as "testsPassed",
        tests_count as "testsCount", language_id as "languageId", T.name as "taskName"
      FROM TaskResult TR, Task T
      WHERE (
        TR.work_id = %L and TR.user_id = %L and TR.task_id = T.id
      )
    `,
      workId,
      userId,
    )

    return tasksResults
  }
}

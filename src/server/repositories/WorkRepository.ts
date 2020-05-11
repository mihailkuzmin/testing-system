import { db } from '@db'
import { Work, CreateWork, WorkId } from '@common/typings/work'
import { TaskPreview } from '@common/typings/task'

export class WorkRepository {
  static async create(w: CreateWork): Promise<void> {
    const [work] = await db.query(
      `
        INSERT INTO Work as W (name, open_at, close_at) VALUES (%L)
        RETURNING
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt";
      `,
      [w.name, w.openAt, w.closeAt],
    )

    const tasks = w.tasks.map((taskId) => [work.id, taskId])
    await db.query(`INSERT INTO Work_Task as WT (work_id, task_id) VALUES %L`, tasks)

    return work
  }

  static async getById(id: WorkId): Promise<Work> {
    const [work] = await db.query(
      `
        SELECT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
        WHERE
          (W.id = %L)
      `,
      id,
    )
    return work
  }

  static async getTasksOfWorkPreviews(id: WorkId): Promise<TaskPreview[]> {
    const tasks = await db.query(
      `
        SELECT
          T.id, T.name, T.description, jsonb_build_object('id', Topic.id, 'name', Topic.name) as topic,
          (
            SELECT jsonb_build_object('input', input, 'output', output)
            FROM Test
            WHERE Test.task_id = T.id
            ORDER BY id LIMIT 1
          ) as test
        FROM Work_Task WT, Task T, TaskTopic Topic, Test
        WHERE
          (WT.work_id = %L and T.id = WT.task_id and Topic.id = T.topic_id and Test.task_id = T.id);
      `,
      id,
    )
    return tasks
  }

  static async getAll(): Promise<Work[]> {
    const works = await db.query(`
        SELECT 
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
      `)
    return works
  }

  static async removeById(id: WorkId): Promise<Work> {
    const [work] = await db.query(
      `
        DELETE FROM Work as W
        WHERE (W.id = %L)
        RETURNING
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
      `,
      id,
    )
    return work
  }
}

import { db } from '@db'
import { Work, CreateWork, WorkId, UpdateWork } from '@common/typings/work'
import { Task } from '@common/typings/task'

export class WorkRepository {
  static async create(w: CreateWork): Promise<void> {
    const [work] = await db.query(
      `
        INSERT INTO Work as W (name, open_at, close_at) VALUES (%L, %L, %L)
        RETURNING W.id
      `,
      w.name,
      w.openAt,
      w.closeAt,
    )

    const tasks = w.tasks.map((taskId) => [work.id, taskId])
    await db.query(`INSERT INTO Work_Task as WT (work_id, task_id) VALUES %L`, tasks)
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

  static async update(w: UpdateWork): Promise<void> {
    await db.query(
      `
        SELECT NOW()
      `,
      w.id,
    )
  }

  static async getTasksOfWork(id: WorkId): Promise<Task[]> {
    const tasks = await db.query(
      `
        SELECT
          T.id, T.name, T.description, jsonb_build_object('id', Topic.id, 'name', Topic.name) as topic,
          (
            SELECT array(SELECT jsonb_build_object('id', Test.id, 'input', Test.input, 'output', Test.output)
            FROM Test
            WHERE Test.task_id = T.id
            ORDER BY id)
          ) as tests
        FROM Work_Task WT, Task T, TaskTopic Topic
        WHERE
          (WT.work_id = %L and T.id = WT.task_id and Topic.id = T.topic_id);
      `,
      id,
    )

    return tasks
  }

  static async getAll(): Promise<Work[]> {
    const works = await db.query(
      `SELECT W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt" FROM Work W`,
    )
    return works
  }

  static async removeById(id: WorkId): Promise<void> {
    await db.query(`DELETE FROM Work as W WHERE (W.id = %L)`, id)
  }
}

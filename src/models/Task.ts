import { db } from '../db'
import format from 'pg-format'
import { ITask, CreateTask, UpdateTask, TaskId } from '../typings/task'

export class Task {
  static async getById(id: TaskId) {
    const [result] = await db.query(
      `
        SELECT
          T.id, T.name, T.description
        FROM Task T
        WHERE (T.id = %L)
      `,
      id,
    )
    return result
  }

  static async getAll(): Promise<ITask[]> {
    const result = await db.query(`
        SELECT
          T.id, T.name, T.description
        FROM Task T
        ORDER BY T.id
      `)
    return result
  }

  static async create(t: CreateTask): Promise<ITask> {
    const [task] = await db.query(
      `
        INSERT INTO Task as T (
          name,
          description
        ) VALUES (%L)
        RETURNING
          T.id, T.description
      `,
      [t.name, t.description],
    )

    const tests = t.tests.map((test) => [task.id, ...Object.values(test)])
    await db.query(`INSERT INTO Test as T (task_id, input, output) VALUES %L`, tests)

    return task
  }

  static async update(t: UpdateTask): Promise<ITask> {
    const [task] = await db.query(
      `
        UPDATE Task T
        SET
          name = %L,
          description = %L
        WHERE (T.id = %L)
        RETURNING
          T.id, T.name, T.description
      `,
      t.name,
      t.description,
      t.id,
    )
    return task
  }

  static async removeById(id: TaskId): Promise<ITask> {
    const [task] = await db.query(
      `
        DELETE FROM Task as T
        WHERE (T.id = %L)
        RETURNING
          T.id, T.name, T.description
      `,
      id,
    )
    return task
  }
}

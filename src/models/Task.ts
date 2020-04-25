import { db } from '../db'
import { ITask, CreateTask, UpdateTask, TaskId } from '../typings/task'

export class Task {
  static async getById(id: TaskId) {
    try {
      const [result] = await db.query(
        `
        SELECT
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
        FROM Task T
        WHERE T.id = ($1)
      `,
        [id],
      )
      return result
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<ITask[]> {
    try {
      const result = await db.query(`
        SELECT
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
        FROM Task T
        ORDER BY T.id
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  static async create(t: CreateTask): Promise<ITask> {
    try {
      const [task] = await db.query(
        `
        INSERT INTO Task as T (
          description
        ) VALUES ($1)
        RETURNING
          T.id, T.description
      `,
        [t.description],
      )

      const tests = t.tests.map((test) => [task.id, ...Object.values(test)])
      await db.query(format(`INSERT INTO Test as T (task_id, input, output) VALUES %L`, tests))

      return task
    } catch (e) {
      throw e
    }
  }

  static async update(t: UpdateTask): Promise<ITask> {
    try {
      const [task] = await db.query(
        `
        UPDATE Task T
        SET
          description = ($2),
          example_input = ($3),
          example_output = ($4),
          correct_output = ($5)
        WHERE (T.id = ($1))
        RETURNING
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
      `,
        [t.id, t.description, t.exampleInput, t.exampleOutput, t.correctOutput],
      )
      return task
    } catch (e) {
      throw e
    }
  }

  static async removeById(id: TaskId): Promise<ITask> {
    try {
      const [task] = await db.query(
        `
        DELETE FROM Task as T
        WHERE (T.id = ($1))
        RETURNING
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
      `,
        [id],
      )
      return task
    } catch (e) {
      throw e
    }
  }
}

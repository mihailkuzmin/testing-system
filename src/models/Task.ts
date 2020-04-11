import { db } from '../db'
import { TaskQueryResult, CreateTask } from '../typings/task'

export class Task {
  static async getById(id: number | string) {
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

  static async getAll(): Promise<TaskQueryResult[]> {
    try {
      const result = await db.query(`
        SELECT
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
        from Task T
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  static async create(t: CreateTask): Promise<TaskQueryResult> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO Task as T (
          description,
          example_input,
          example_output,
          correct_output
        ) VALUES($1, $2, $3, $4)
        RETURNING
          T.id, T.description, T.example_input as "exampleInput",
          T.example_output as "exampleOutput", T.correct_output as "correctOutput"
      `,
        [t.description, t.exampleInput, t.exampleOutput, t.correctOutput],
      )
      return result
    } catch (e) {
      throw e
    }
  }
}

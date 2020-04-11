import { db } from '../db'
import { TaskQueryResult } from '../typings/task'

export class Task {
  constructor(
    private description: string,
    private exampleInput: string,
    private exampleOutput: string,
    private correctOutput: string,
  ) {}

  static async getById(id: number | string) {
    try {
      const [result] = await db.query(
        `
        SELECT * FROM Task WHERE Task.id = ($1)
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
        SELECT * from Task
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<TaskQueryResult> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO Task(
          description,
          example_input,
          example_output,
          correct_output
        ) VALUES($1, $2, $3, $4)
        RETURNING *
      `,
        [this.description, this.exampleInput, this.exampleOutput, this.correctOutput],
      )
      return result
    } catch (e) {
      throw e
    }
  }
}

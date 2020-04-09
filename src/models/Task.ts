import { db } from '../db'
import { TaskQueryResult } from '../typings/task'

export class Task {
  constructor(
    private description: string,
    private inputFileName: string,
    private outputFileName: string,
    private exampleInputFileName: string,
    private exampleOutputFileName: string,
    private correctOutputFileName: string,
  ) {}

  static async getById(id: number | string) {
    try {
      const { rows } = await db.query(
        `
        SELECT * FROM Task WHERE Task.id = ($1)
      `,
        [id],
      )
      return rows
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<TaskQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT * from Task
      `)
      return rows
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<TaskQueryResult> {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO Task(
          description,
          input_name,
          output_name,
          example_input,
          example_output,
          correct_output) VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
        [
          this.description,
          this.inputFileName,
          this.outputFileName,
          this.exampleInputFileName,
          this.exampleOutputFileName,
          this.correctOutputFileName,
        ],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

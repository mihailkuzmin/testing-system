import { db } from '../db'
import { TaskQueryResult } from '../typings/queries/task'

export class Task {
  constructor(
    private description: string,
    private inputFileName: string,
    private outputFileName: string,
    private exampleInputFileName: string,
    private exampleOutputFileName: string,
    private correctOutputFileName: string,
  ) {}

  static async getAll(): Promise<TaskQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT * from Student
      `)
      return rows
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<void> {
    try {
      await db.query(
        `
        INSERT INTO Task(
          description,
          input_name,
          output_name,
          example_intput,
          example_output,
          correct_output) VALUES($1, $2, $3, $4, $5, $6)
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
    } catch (e) {
      throw e
    }
  }
}

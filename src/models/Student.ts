import { db } from '../db'
import { StudentQueryResult } from '../typings/queries/student'

export class Student {
  constructor(private name: string, private groupId: number) {}

  static async getById(id: number | string) {
    try {
      const { rows } = await db.query(
        `
        SELECT * FROM Student WHERE Student.id = ($1)
      `,
        [id],
      )
      return rows
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<StudentQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT * from Student
      `)
      return rows
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<StudentQueryResult> {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO Student(name, group_id) VALUES($1, $2)
        RETURNING *
      `,
        [this.name, this.groupId],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

import { db } from '../db'
import { StudentQueryResult } from '../typings/queries/student'

export class Student {
  constructor(private name: string, private groupId: number) {}

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

  public async save(): Promise<void> {
    try {
      await db.query(
        `
        INSERT INTO Student(name, group_id) VALUES($1, $2)
      `,
        [this.name, this.groupId],
      )
    } catch (e) {
      throw e
    }
  }
}

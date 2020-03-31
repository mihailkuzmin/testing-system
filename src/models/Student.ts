import { db } from '../db'
import { StudentQueryResult } from '../typings/queries/student'

export class Student {
  constructor(
    private name: string,
    private groupId: number,
    private login: string,
    private password: string,
  ) {}

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
        INSERT INTO Student(name, group_id, login, password) VALUES($1, $2, $3, $4)
        RETURNING id, name, group_id as group, login
      `,
        [this.name, this.groupId, this.login, this.password],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

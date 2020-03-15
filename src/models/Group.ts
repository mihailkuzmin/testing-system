import { db } from '../db'
import { StudentQueryResult } from '../typings/queries/student'

export class Group {
  constructor(private name: string) {}

  static async getById(id: number | string) {
    try {
      const { rows } = await db.query(
        `
        SELECT * FROM StudentGroup WHERE StudentGroup.id = ($1)
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
        SELECT * from StudentGroup
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
        INSERT INTO StudentGroup(name) VALUES($1)
      `,
        [this.name],
      )
    } catch (e) {
      throw e
    }
  }
}

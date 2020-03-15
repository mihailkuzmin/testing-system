import { db } from '../db'
import { WorkQueryResult } from '../typings/queries/work'

export class Work {
  constructor(private name: string, private openAt: string, private closeAt: string) {}

  async save(): Promise<WorkQueryResult> {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO Work(name, open_at, close_at) VALUES($1, $2, $3)
        RETURNING *
      `,
        [this.name, this.openAt, this.closeAt],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }

  static async getById(id: number | string) {
    try {
      const { rows } = await db.query(
        `
        SELECT * FROM Work WHERE Work.id = ($1)
      `,
        [id],
      )
      return rows
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<WorkQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT * FROM Work
      `)
      return rows
    } catch (e) {
      throw e
    }
  }
}

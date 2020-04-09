import { db } from '../db'
import { GroupQueryResult } from '../typings/group'

export class Group {
  constructor(private name: string) {}

  static async getById(id: number | string): Promise<GroupQueryResult> {
    try {
      const { rows } = await db.query(
        `
        SELECT * 
        FROM StudentGroup AS S
        WHERE StudentGroup.id = ($1)
      `,
        [id],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<GroupQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT * 
        FROM StudentGroup AS S
        ORDER BY S.name
      `)
      return rows
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<GroupQueryResult> {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO StudentGroup(name) VALUES($1)
        RETURNING *
      `,
        [this.name],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

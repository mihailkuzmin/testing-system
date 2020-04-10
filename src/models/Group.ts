import { db } from '../db'
import { GroupQueryResult } from '../typings/group'

export class Group {
  constructor(private name: string) {}

  static async getById(id: number | string): Promise<GroupQueryResult> {
    try {
      const [result] = await db.query(
        `
        SELECT * 
        FROM StudentGroup AS S
        WHERE StudentGroup.id = ($1)
      `,
        [id],
      )
      return result
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<GroupQueryResult[]> {
    try {
      const result = await db.query(`
        SELECT * 
        FROM StudentGroup AS S
        ORDER BY S.name
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<GroupQueryResult> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO StudentGroup(name) VALUES($1)
        RETURNING *
      `,
        [this.name],
      )
      return result
    } catch (e) {
      throw e
    }
  }
}

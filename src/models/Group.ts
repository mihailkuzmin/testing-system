import { db } from '../db'
import { GroupQueryResult, CreateGroup } from '../typings/group'

export class Group {
  static async getById(id: number | string): Promise<GroupQueryResult> {
    try {
      const [result] = await db.query(
        `
        SELECT
  static async removeById(id: GroupId): Promise<GroupQueryResult> {
    try {
      const [group] = await db.query(
        `
        DELETE FROM StudentGroup as G
        WHERE (G.id = ($1))
        RETURNING
          G.id, G.name
      `,
        [id],
      )
      return group
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<GroupQueryResult[]> {
    try {
      const result = await db.query(`
        SELECT
          * 
        FROM StudentGroup S
        ORDER BY S.name
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  static async create(g: CreateGroup): Promise<GroupQueryResult> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO StudentGroup (
          name
        ) VALUES($1)
        RETURNING *
      `,
        [g.name],
      )
      return result
    } catch (e) {
      throw e
    }
  }
}

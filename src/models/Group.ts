import { db } from '../db'
import { GroupQueryResult, CreateGroup, GroupId } from '../typings/group'

export class Group {
  static async getById(id: GroupId): Promise<GroupQueryResult> {
    try {
      const [group] = await db.query(
        `
        SELECT
          G.id, G.name
        FROM StudentGroup G
        WHERE G.id = ($1)
      `,
        [id],
      )
      return group
    } catch (e) {
      throw e
    }
  }

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
      const groups = await db.query(`
        SELECT
          G.id, G.name
        FROM StudentGroup G
        ORDER BY G.name
      `)
      return groups
    } catch (e) {
      throw e
    }
  }

  static async create(g: CreateGroup): Promise<GroupQueryResult> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO StudentGroup as G (
          name
        ) VALUES($1)
        RETURNING
          G.id, G.name
      `,
        [g.name],
      )
      return result
    } catch (e) {
      throw e
    }
  }
}

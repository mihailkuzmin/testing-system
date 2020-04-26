import { db } from '../db'
import { IGroup, CreateGroup, GroupId, UpdateGroup } from '../typings/group'

export class Group {
  static async getById(id: GroupId): Promise<IGroup> {
    try {
      const [group] = await db.query(
        `
        SELECT
          G.id, G.name
        FROM StudentGroup G
        WHERE G.id = %L
      `,
        id,
      )
      return group
    } catch (e) {
      throw e
    }
  }

  static async removeById(id: GroupId): Promise<IGroup> {
    try {
      const [group] = await db.query(
        `
        DELETE FROM StudentGroup as G
        WHERE (G.id = %L)
        RETURNING
          G.id, G.name
      `,
        id,
      )
      return group
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<IGroup[]> {
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

  static async create(g: CreateGroup): Promise<IGroup> {
    try {
      const [result] = await db.query(
        `
        INSERT INTO StudentGroup as G (
          name
        ) VALUES (%L)
        RETURNING
          G.id, G.name
      `,
        g.name,
      )
      return result
    } catch (e) {
      throw e
    }
  }

  static async update(g: UpdateGroup): Promise<IGroup> {
    try {
      const [group] = await db.query(
        `
        UPDATE StudentGroup G
        SET
          name = %L
        WHERE (G.id = %L)
        RETURNING
          G.id, G.name
      `,
        g.name,
        g.id,
      )
      return group
    } catch (e) {
      throw e
    }
  }
}

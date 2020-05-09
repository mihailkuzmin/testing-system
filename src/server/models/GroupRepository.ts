import { Group, GroupId, CreateGroup, UpdateGroup } from '@common/typings/group'
import { db } from '../db'

export class GroupRepository {
  static async getById(id: GroupId): Promise<Group> {
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
  }

  static async removeById(id: GroupId): Promise<Group> {
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
  }

  static async getAll(): Promise<Group[]> {
    const groups = await db.query(`
        SELECT
          G.id, G.name
        FROM StudentGroup G
        ORDER BY G.name
      `)
    return groups
  }

  static async create(g: CreateGroup): Promise<Group> {
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
  }

  static async update(g: UpdateGroup): Promise<Group> {
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
  }
}

import { db } from '@db'
import { Group, GroupId, CreateGroup, UpdateGroup } from '@common/typings/group'

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

  static async removeById(id: GroupId): Promise<void> {
    await db.query(`DELETE FROM StudentGroup as G WHERE (G.id = %L)`, id)
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

  static async create(g: CreateGroup): Promise<void> {
    await db.query(`INSERT INTO StudentGroup as G (name) VALUES (%L)`, g.name)
  }

  static async update(g: UpdateGroup): Promise<void> {
    await db.query(`UPDATE StudentGroup G SET name = %L WHERE (G.id = %L)`, g.name, g.id)
  }
}

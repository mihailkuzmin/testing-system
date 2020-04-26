import { db } from '../db'
import { IWork, CreateWork, WorkId } from '../typings/work'

export class Work {
  static async create(w: CreateWork): Promise<IWork> {
    try {
      const [work] = await db.query(
        `
        INSERT INTO Work as W (name, open_at, close_at) VALUES (%L)
        RETURNING
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
      `,
        [w.name, w.openAt, w.closeAt],
      )
      return work
    } catch (e) {
      throw e
    }
  }

  static async getById(id: WorkId): Promise<IWork> {
    try {
      const [work] = await db.query(
        `
        SELECT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
        WHERE
          (W.id = %L)
      `,
        id,
      )
      return work
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<IWork[]> {
    try {
      const works = await db.query(`
        SELECT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
      `)
      return works
    } catch (e) {
      throw e
    }
  }
}

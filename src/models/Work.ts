import { db } from '../db'
import { IWork, CreateWork, WorkId } from '../typings/work'
import { ITask, TaskId } from '../typings/task'

export class Work {
  static async create(w: CreateWork): Promise<IWork> {
    const [work] = await db.query(
      `
        INSERT INTO Work as W (name, open_at, close_at) VALUES (%L)
        RETURNING
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
      `,
      [w.name, w.openAt, w.closeAt],
    )
    return work
  }

  static async getById(id: WorkId): Promise<IWork> {
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
  }

  static async getAll(): Promise<IWork[]> {
    const works = await db.query(`
        SELECT 
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
      `)
    return works
  }

  static async removeById(id: WorkId): Promise<IWork> {
    const [work] = await db.query(
      `
        DELETE FROM Work as W
        WHERE (W.id = %L)
        RETURNING
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
      `,
      id,
    )
    return work
  }
}

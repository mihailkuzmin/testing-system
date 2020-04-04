import { db } from '../db'
import { StudentQueryResult } from '../typings/queries/student'

export class Student {
  constructor(
    private name: string,
    private bookNumber: string,
    private groupId: number,
    private login: string,
    private password: string,
  ) {}

  static async getById(id: number | string): Promise<StudentQueryResult> {
    try {
      const { rows } = await db.query(
        `
        SELECT S.id, S.name, S.book_number as bookNumber, G.name as group, S.login
        FROM Student as S
        JOIN StudentGroup as G ON (G.id = S.group_id)
        WHERE S.id = ($1)
      `,
        [id],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }

  static async removeById(id: number | string): Promise<StudentQueryResult> {
    try {
      const { rows } = await db.query(
        `
        DELETE FROM Student as S
        USING StudentGroup as G
        WHERE (S.id = ($1)) and (G.id = S.group_id)
        RETURNING S.id, S.name, S.book_number as bookNumber, G.name as group, S.login
      `,
        [id],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<StudentQueryResult[]> {
    try {
      const { rows } = await db.query(`
        SELECT S.id, S.name, S.book_number as "bookNumber", G.name AS group, S.login
        FROM Student AS S, StudentGroup AS G
        WHERE G.id = S.group_id
        ORDER BY G.name, S.name
      `)
      return rows
    } catch (e) {
      throw e
    }
  }

  public async save(): Promise<StudentQueryResult> {
    try {
      const { rows } = await db.query(
        `
        INSERT INTO Student(name, book_number, group_id, login, password) VALUES($1, $2, $3, $4, $5)
        RETURNING id, name, book_number, group_id as group, login
      `,
        [this.name, this.bookNumber, this.groupId, this.login, this.password],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

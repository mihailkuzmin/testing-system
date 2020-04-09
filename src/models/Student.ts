import { db } from '../db'
import { StudentQueryResult, UpdateParams } from '../typings/student'

export class Student {
  constructor(
    private lastName: string,
    private firstName: string,
    private patronymic: string,
    private bookNumber: string,
    private groupId: number,
    private login: string,
    private password: string,
  ) {}

  static async getById(id: number | string): Promise<StudentQueryResult> {
    try {
      const { rows } = await db.query(
        `
        SELECT 
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as bookNumber, G.name as group, S.login
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
        RETURNING 
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as bookNumber, G.name as group, S.login
      `,
        [id],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }

  static async update(s: UpdateParams): Promise<StudentQueryResult> {
    try {
      if (s.changePassword) {
        const { rows } = await db.query(
          `
          UPDATE Student
          SET
            last_name = ($2),
            first_name = ($3),
            patronymic = ($4),
            book_number = ($5),
            group_id = ($6),
            login = ($7),
            password = ($8)
          WHERE (id = ($1))
          RETURNING
            id, last_name as "lastName", first_name as "firstName", patronymic,
            book_number as bookNumber, group_id as group, login, password
        `,
          [s.id, s.lastName, s.firstName, s.patronymic, s.bookNumber, s.group, s.login, s.password],
        )
        const [result] = rows
        return result
      }
      
      const { rows } = await db.query(
        `
        UPDATE Student
        SET
          last_name = ($2),
          first_name = ($3),
          patronymic = ($4),
          book_number = ($5),
          group_id = ($6),
          login = ($7)
        WHERE id = ($1)
        RETURNING
          id, last_name as "lastName", first_name as "firstName", patronymic,
          book_number as bookNumber, group_id as group, login, password
      `,
        [s.id, s.lastName, s.firstName, s.patronymic, s.bookNumber, s.group, s.login],
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
        SELECT
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", G.name AS group, S.login
        FROM Student AS S, StudentGroup AS G
        WHERE G.id = S.group_id
        ORDER BY G.name, S.last_Name, S.first_name, S.patronymic
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
        INSERT INTO Student(
          last_name, first_name, patronymic, book_number, group_id, login, password
        ) VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id, last_name as "lastName", first_name as "firstName", patronymic,
          book_number, group_id as group, login
      `,
        [
          this.lastName,
          this.firstName,
          this.patronymic,
          this.bookNumber,
          this.groupId,
          this.login,
          this.password,
        ],
      )
      const [result] = rows
      return result
    } catch (e) {
      throw e
    }
  }
}

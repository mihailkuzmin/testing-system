import { db } from '../db'
import { StudentQueryResult, UpdateStudent, CreateStudent } from '../typings/student'

export class Student {
  static async getById(id: number | string): Promise<StudentQueryResult> {
    try {
      const [result] = await db.query(
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
      return result
    } catch (e) {
      throw e
    }
  }

  static async removeById(id: number | string): Promise<StudentQueryResult> {
    try {
      const [result] = await db.query(
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
      return result
    } catch (e) {
      throw e
    }
  }

  static async update(s: UpdateStudent): Promise<StudentQueryResult> {
    try {
      if (s.changePassword) {
        const [result] = await db.query(
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
        return result
      }

      const [result] = await db.query(
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
      return result
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<StudentQueryResult[]> {
    try {
      const result = await db.query(`
        SELECT
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", G.name AS group, S.login
        FROM Student AS S, StudentGroup AS G
        WHERE G.id = S.group_id
        ORDER BY G.name, S.last_Name, S.first_name, S.patronymic
      `)
      return result
    } catch (e) {
      throw e
    }
  }

  static async create(user: CreateStudent): Promise<StudentQueryResult> {
    try {
      const [student] = await db.query(
        `
        INSERT INTO Student as S
          (last_name, first_name, patronymic, book_number, group_id, login, password)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", (group_id, (
            SELECT G.name FROM StudentGroup G WHERE G.id = group_id
          )) as group, S.login
      `,
        [
          user.lastName,
          user.firstName,
          user.patronymic,
          user.bookNumber,
          user.group,
          user.login,
          user.password,
        ],
      )
      student.group = this._parseGroup(student.group)
      return student
    } catch (e) {
      throw e
    }
  }

  static _parseGroup(str: string) {
    // parse string '($id, $name)' into object {id, name}
    const [id, name] = str.slice(1, -1).split(',')
    return { id: Number(id), name }
  }
}

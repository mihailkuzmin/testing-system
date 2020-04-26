import { db } from '../db'
import { IStudent, UpdateStudent, CreateStudent, StudentId } from '../typings/student'

export class Student {
  static async getById(id: StudentId): Promise<IStudent> {
    try {
      const [student] = await db.query(
        `
        SELECT 
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", (G.id, G.name) as group, S.login
        FROM Student S, StudentGroup G
        WHERE (S.id = %L and S.group_id = G.id)
      `,
        id,
      )

      student.group = this._parseGroup(student.group)
      return student
    } catch (e) {
      throw e
    }
  }

  static async removeById(id: StudentId): Promise<IStudent> {
    try {
      const [student] = await db.query(
        `
        DELETE FROM Student as S
        USING StudentGroup as G
        WHERE (S.id = %L) and (G.id = S.group_id)
        RETURNING 
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as bookNumber, (G.id, G.name) as group, S.login
      `,
        id,
      )
      student.group = this._parseGroup(student.group)
      return student
    } catch (e) {
      throw e
    }
  }

  static async update(s: UpdateStudent): Promise<IStudent> {
    try {
      if (s.changePassword) {
        const [student] = await db.query(
          `
          UPDATE Student S
          SET
            last_name = %L,
            first_name = %L,
            patronymic = %L,
            book_number = %L,
            group_id = %L,
            login = %L,
            password = %L
          WHERE (S.id = %L)
          RETURNING
            S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
            S.book_number as "bookNumber", (S.group_id, (
              SELECT G.name FROM StudentGroup G WHERE G.id = S.group_id
            )) as group, S.login, S.password
        `,
          s.lastName,
          s.firstName,
          s.patronymic,
          s.bookNumber,
          s.group,
          s.login,
          s.password,
          s.id,
        )
        student.group = this._parseGroup(student.group)
        return student
      }

      const [student] = await db.query(
        `
        UPDATE Student S
        SET
          last_name = %L,
          first_name = %L,
          patronymic = %L,
          book_number = %L,
          group_id = %L,
          login = %L
        WHERE (S.id = %L)
        RETURNING
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", (S.group_id, (
            SELECT G.name FROM StudentGroup G WHERE G.id = S.group_id
          )) as group, S.login, S.password
      `,
        s.lastName,
        s.firstName,
        s.patronymic,
        s.bookNumber,
        s.group,
        s.login,
        s.id,
      )
      student.group = this._parseGroup(student.group)
      return student
    } catch (e) {
      throw e
    }
  }

  static async getAll(): Promise<IStudent[]> {
    try {
      const students = await db.query(`
        SELECT
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", (G.id, G.name) as group, S.login
        FROM Student S, StudentGroup G
        WHERE G.id = S.group_id
        ORDER BY G.name, S.last_Name, S.first_name, S.patronymic
      `)
      for (const student of students) {
        student.group = this._parseGroup(student.group)
      }

      return students
    } catch (e) {
      throw e
    }
  }

  static async create(user: CreateStudent): Promise<IStudent> {
    try {
      const [student] = await db.query(
        `
        INSERT INTO Student as S
          (last_name, first_name, patronymic, book_number, group_id, login, password)
        VALUES (%L)
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

import { db } from '@db'
import {
  Student,
  UpdateStudent,
  CreateStudent,
  StudentId,
  Login,
  Password,
} from '@common/typings/student'
import { UserInfo } from '@common/typings/auth'

export class StudentRepository {
  static async getUserInfoByLogin(login: Login): Promise<UserInfo> {
    const [user] = await db.query(
      `
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", jsonb_build_object('id', G.id, 'name', G.name) as group, S.login
      FROM Student S, StudentGroup G
      WHERE (S.login = %L)
    `,
      login,
    )

    return user
  }

  static async getPasswordByLogin(login: Login): Promise<Password> {
    const [fromDb] = await db.query(
      `
      SELECT
        S.password
      FROM Student S
      WHERE (S.login = %L)
    `,
      login,
    )

    return fromDb.password
  }

  static async getById(id: StudentId): Promise<Student> {
    const [student] = await db.query(
      `
        SELECT
          S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
          S.book_number as "bookNumber", jsonb_build_object('id', G.id, 'name', G.name) as group, S.login
        FROM Student S, StudentGroup G
        WHERE (S.id = %L and S.group_id = G.id)
      `,
      id,
    )

    return student
  }

  static async removeById(id: StudentId): Promise<void> {
    await db.query(`DELETE FROM Student as S WHERE (S.id = %L)`, id)
  }

  static async update(s: UpdateStudent): Promise<void> {
    if (s.changePassword) {
      await db.query(
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
    } else {
      await db.query(
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
      `,
        s.lastName,
        s.firstName,
        s.patronymic,
        s.bookNumber,
        s.group,
        s.login,
        s.id,
      )
    }
  }

  static async getAll(): Promise<Student[]> {
    const students = await db.query(`
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", jsonb_build_object('id', G.id, 'name', G.name) as group, S.login
      FROM Student S, StudentGroup G
      WHERE G.id = S.group_id
      ORDER BY G.name, S.last_Name, S.first_name, S.patronymic
    `)

    return students
  }

  static async create(user: CreateStudent): Promise<void> {
    await db.query(
      `INSERT INTO Student as S (last_name, first_name, patronymic, book_number, group_id, login, password) VALUES (%L)`,
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
  }
}

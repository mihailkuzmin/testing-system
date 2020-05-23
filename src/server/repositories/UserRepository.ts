import { User, UpdateUser, CreateUser, UserId, Role, Roles } from '@common/typings/user'
import { Credentials, UserInfo } from '@common/typings/auth'
import { db } from '@db'
import { Hasher } from '@lib/Hasher'

const hasher = new Hasher()

export class UserRepository {
  static async getRoles(): Promise<Role[]> {
    const roles = await db.query(
      `SELECT id, name FROM Role WHERE (Role.name != %L)`,
      Roles.Administrator,
    )
    return roles
  }

  static async getUserInfoByLogin(login: string): Promise<UserInfo> {
    const [user] = await db.query(
      `
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        CASE WHEN S.group_id IS NULL THEN NULL ELSE jsonb_build_object('id', G.id, 'name', G.name) END as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, StudentGroup G, Role R
      WHERE (S.login = %L and (G.id = S.group_id OR S.group_id IS NULL) and R.id = S.role_id)
    `,
      login,
    )

    return user
  }

  static async getUserInfoById(id: UserId): Promise<UserInfo> {
    const [user] = await db.query(
      `
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        CASE WHEN S.group_id IS NULL THEN NULL ELSE jsonb_build_object('id', G.id, 'name', G.name) END as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, StudentGroup G, Role R
      WHERE (S.id = %L and (G.id = S.group_id OR S.group_id IS NULL) and R.id = S.role_id)
    `,
      id,
    )

    return user
  }

  static async verifyCredentials(credentials: Credentials): Promise<boolean> {
    const [fromDb] = await db.query(
      `SELECT S.password FROM Student S WHERE (S.login = %L)`,
      credentials.login,
    )

    if (!fromDb) {
      return false
    }

    const [oldHash, salt] = fromDb.password.split('.')

    const isValid = await hasher.verifyString(credentials.password, oldHash, salt)
    return isValid
  }

  static async getById(id: UserId): Promise<User> {
    const [student] = await db.query(
      `
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        jsonb_build_object('id', G.id, 'name', G.name) as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, StudentGroup G, Role R
      WHERE (S.id = %L and (G.id = S.group_id) and R.id = S.role_id)
      `,
      id,
    )

    return student
  }

  static async removeById(id: UserId): Promise<void> {
    await db.query(`DELETE FROM Student as S WHERE (S.id = %L)`, id)
  }

  static async update(user: UpdateUser): Promise<void> {
    if (user.changePassword) {
      user.password = await hasher.generateHash(user.password)
      await db.query(
        `
          UPDATE Student S
          SET
            last_name = %L,
            first_name = %L,
            patronymic = %L,
            book_number = %L,
            group_id = %L,
            role_id = %L,
            login = %L,
            password = %L
          WHERE (S.id = %L)
        `,
        user.lastName,
        user.firstName,
        user.patronymic,
        user.bookNumber,
        user.groupId,
        user.roleId,
        user.login,
        user.password,
        user.id,
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
          role_id = %L,
          login = %L
        WHERE (S.id = %L)
      `,
        user.lastName,
        user.firstName,
        user.patronymic,
        user.bookNumber,
        user.groupId,
        user.roleId,
        user.login,
        user.id,
      )
    }
  }

  static async getAll(): Promise<User[]> {
    const students = await db.query(`
      SELECT
        S.id, S.last_name as "lastName", S.first_name as "firstName", S.patronymic,
        S.book_number as "bookNumber", S.login,
        jsonb_build_object('id', G.id, 'name', G.name) as group,
        jsonb_build_object('id', R.id, 'name', R.name) as role
      FROM Student S, StudentGroup G, Role R
      WHERE (G.id = S.group_id and R.id = S.role_id)
      ORDER BY G.name, S.last_Name, S.first_name, S.patronymic
    `)

    return students
  }

  static async create(user: CreateUser): Promise<void> {
    user.password = await hasher.generateHash(user.password)
    await db.query(
      `
      INSERT INTO Student as S 
        (last_name, first_name, patronymic, book_number, login, password, group_id, role_id)
      VALUES (%L)`,
      [
        user.lastName,
        user.firstName,
        user.patronymic,
        user.bookNumber,
        user.login,
        user.password,
        user.groupId,
        user.roleId,
      ],
    )
  }
}

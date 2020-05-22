import { GroupId, Group } from '../group'

export type UserId = number

export type RoleId = number
export enum Roles {
  student = 'Студент',
  moderator = 'Модератор',
  administrator = 'Администратор',
}
export type Role = { id: RoleId; name: Roles }

export type User = {
  id: UserId
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string | null
  group: Group | null
  role: Role
  login: string
}

export type CreateUser = {
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  login: string
  password: string
  groupId: GroupId
  roleId: RoleId
}

export type UpdateUser = {
  id: UserId
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  login: string
  password: string
  changePassword: boolean
  groupId: GroupId
  roleId: RoleId
}

import { GroupId, Group } from '../group'

export type StudentId = number
export type Login = string
export type Password = string

export type RoleId = number
export type Roles = 'Студент' | 'Администратор'
export type Role = { id: RoleId; name: Roles }

export type Student = {
  id: StudentId
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: Group
  role: Role
  login: Login
}

export type CreateStudent = {
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string | null
  login: string
  password: string
  groupId: GroupId | null
  roleId: RoleId
}

export type UpdateStudent = {
  id: StudentId
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

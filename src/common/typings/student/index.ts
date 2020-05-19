export type StudentId = number
export type GroupId = number
export type Login = string
export type Password = string

export type Student = {
  id: StudentId
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: { id: GroupId; name: string }
  login: Login
}

export type CreateStudent = {
  lastName: string
  firstName: string
  patronymic: string
  group: number | string
  bookNumber: string
  login: string
  password: string
}

export type UpdateStudent = {
  id: StudentId
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: number | string
  login: string
  password: string
  changePassword: boolean
}

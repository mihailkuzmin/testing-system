export type UserId = number

export interface User {
  id: UserId
  name: string
  group: number | string
  login: string
}

export interface CreateUser {
  lastName: string
  firstName: string
  patronymic: string
  group: number | string
  bookNumber: string
  login: string
  password: string
}

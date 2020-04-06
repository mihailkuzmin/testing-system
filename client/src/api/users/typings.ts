export type UserId = number

export interface User {
  id: UserId
  lastName: string
  firstName: string
  patronymic: string
  group: string
  bookNumber: string
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

export interface UpdateUser {
  id: UserId
  lastName: string
  firstName: string
  patronymic: string
  group: number | string
  bookNumber: string
  login: string
  password?: string
}
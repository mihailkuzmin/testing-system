export interface User {
  id: number
  name: string
  group: number | string
  login: string
}

export interface CreateUser {
  name: string
  group: number | string
  login: string
  password: string
}

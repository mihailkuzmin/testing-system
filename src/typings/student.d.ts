export interface StudentQueryResult {
  id: number
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: string
  login: string
}

export interface UpdateParams {
  id: number
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: string
  login: string
  password: string
  changePassword: boolean
}

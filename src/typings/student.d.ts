export interface StudentQueryResult {
  id: number
  lastName: string
  firstName: string
  patronymic: string
  bookNumber: string
  group: string
  login: string
}

export interface CreateStudent {
  lastName: string
  firstName: string
  patronymic: string
  group: number | string
  bookNumber: string
  login: string
  password: string
}

export interface UpdateStudent {
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

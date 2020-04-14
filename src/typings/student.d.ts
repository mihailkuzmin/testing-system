export type StudentId = number

export interface IStudent {
  id: StudentId
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

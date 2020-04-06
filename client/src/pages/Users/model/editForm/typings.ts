export interface EditForm {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  bookNumber: string
  group: number | string
  login: string
  changePassword: boolean
  password?: string
}

export interface EditFormNewValue {
  key: string
  value: number | string
}

export interface Group {
  id: number
  name: string
}

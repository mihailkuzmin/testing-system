export interface AddForm {
  firstName: string
  lastName: string
  patronymic: string
  bookNumber: string
  group: number | string
  login: string
  password: string
}

export interface AddFormNewValue {
  key: string
  value: number | string
}

export interface Group {
  id: number | string
  name: string
}

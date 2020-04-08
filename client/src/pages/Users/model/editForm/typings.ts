export interface EditForm {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  bookNumber: string
  group: number | string
  login: string
  changePassword: boolean
  password: string
}

export type EditFormValue = number | string | boolean

export interface EditFormEvent {
  key: string
  value: EditFormValue
}

export interface Group {
  id: number
  name: string
}

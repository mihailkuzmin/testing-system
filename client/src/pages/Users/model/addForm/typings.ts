export interface AddForm {
  name: string
  group: number | string
  login: string
  password: string
}

export interface AddFormNewValue {
  key: string
  value: number | string
}

export interface Group {
  id: number
  name: string
}

export type AddForm = {
  firstName: string
  lastName: string
  patronymic: string
  bookNumber: string
  group: number | string
  login: string
  password: string
}

export type AddFormNewValue = {
  key: string
  value: number | string
}

export type Group = {
  id: number | string
  name: string
}

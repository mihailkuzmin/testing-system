import { Status } from '../../../typings'

export interface User {
  id: number
  name: string
  group: string
  login: string
}

export interface AddModal {
  open: boolean
}

export interface AddForm {
  name: string
  group: number | string
  login: string
  password: string
}

export interface AddFormMessage {
  open: boolean
  status: Status
  message: string
}

export interface AddFormNewValue {
  key: string
  value: number | string
}

export interface Group {
  id: number
  name: string
}

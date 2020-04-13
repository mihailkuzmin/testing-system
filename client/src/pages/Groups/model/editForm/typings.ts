export type GroupId = number

export interface Group {
  id: GroupId
  name: string
}

export interface EditForm {
  id: GroupId
  name: string
}

export type EditFormValue = string

export interface EditFormEvent {
  key: string
  value: EditFormValue
}

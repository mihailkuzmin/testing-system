export type GroupId = number

export interface Group {
  id: GroupId
  name: string
}

export interface AddForm {
  name: string
}

export interface AddFormNewValue {
  key: string
  value: string
}

export interface AddModal {
  open: boolean
}

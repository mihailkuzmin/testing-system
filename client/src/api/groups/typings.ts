export type GroupId = number

export interface Group {
  id: GroupId
  name: string
}

export interface CreateGroup {
  name: string
}

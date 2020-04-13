export type GroupId = number

export interface IGroup {
  id: GroupId
  name: string
}

export interface CreateGroup {
  name: string
}

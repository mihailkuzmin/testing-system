export type GroupId = number

export interface IGroup {
  id: GroupId
  name: string
}

export interface CreateGroup {
  name: string
}

export interface UpdateGroup {
  id: GroupId
  name: string
}
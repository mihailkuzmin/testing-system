export type GroupId = number

export interface GroupQueryResult {
  id: GroupId
  name: string
}

export interface CreateGroup {
  name: string
}

export type GroupId = number

//TODO fix types naming
export type IGroup = {
  id: GroupId
  name: string
}

export type CreateGroup = {
  name: string
}

export type UpdateGroup = {
  id: GroupId
  name: string
}

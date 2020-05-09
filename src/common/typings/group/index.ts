export type GroupId = number

export type Group = { id: GroupId; name: string }

export type CreateGroup = { name: string }

export type UpdateGroup = { id: GroupId; name: string }

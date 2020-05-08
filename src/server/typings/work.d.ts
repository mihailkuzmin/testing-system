export type WorkId = number

//TODO fix types naming
export type IWork = {
  id: WorkId
  name: string
  openAt: string
  closeAt: string
}

export type CreateWork = {
  name: string
  openAt: string
  closeAt: string
}

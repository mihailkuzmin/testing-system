export type WorkId = number

export interface IWork {
  id: WorkId
  name: string
  openAt: string
  closeAt: string
}

export interface CreateWork {
  name: string
  openAt: string
  closeAt: string
}

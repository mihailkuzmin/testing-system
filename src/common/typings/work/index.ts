export type WorkId = number

export type Work = {
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

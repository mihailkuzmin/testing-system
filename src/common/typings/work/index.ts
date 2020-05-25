import { TaskId } from '../task'
import { GroupId } from '../group'

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
  tasks: TaskId[]
  groups: GroupId[]
}

export type UpdateWork = {
  id: WorkId
  name: string
  openAt: string
  closeAt: string
  tasks: TaskId[]
  groups: GroupId[]
}

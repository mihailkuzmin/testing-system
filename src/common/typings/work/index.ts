import { PLangId, TaskId } from '../task'
import { GroupId } from '../group'
import { UserId } from '../user'

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

export type BeginWork = {
  workId: WorkId
  userId: UserId
  startedAt: string
}

export type TaskExecResult = {
  workId: WorkId
  userId: UserId
  taskId: TaskId
  code: string
  testsPassed: number
  testsCount: number
  languageId: PLangId
}

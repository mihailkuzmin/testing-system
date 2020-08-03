import { UserId } from '../user'
import { PLangId, TaskId } from '../task'
import { WorkId } from '../work'

export type TaskResultId = number

export type TaskResult = {
  id: TaskResultId
  workId: WorkId
  taskId: TaskId
  userId: UserId
  languageId: PLangId
  code: string
  testsPassed: number
  testsCount: number
}

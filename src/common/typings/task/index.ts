import { WorkId } from '../work'
import { UserId } from '../user'

export enum PLangs {
  Python = 'Python',
  JavaScript = 'JavaScript',
  Pascal = 'Pascal',
}
export type PLangId = number
export type PLang = { id: PLangId; name: PLangs }

export type TaskId = number
export type TestId = number
export type TopicId = number
export type CreateTestId = number | string
export type UpdateTestId = number | string

export type Topic = { id: TopicId; name: string }

export type Test = { id: TestId; input: string; output: string }

export type CreateTest = { id: CreateTestId; input: string; output: string }
export type UpdateTest = { id: CreateTestId; input: string; output: string; old: boolean }

export type CreateTask = {
  name: string
  description: string
  topicId: TopicId
  tests: CreateTest[]
}

export type Task = {
  id: TaskId
  name: string
  description?: string
  topic: Topic
  tests?: Test[]
}

export type UpdateTask = {
  id: TaskId
  name: string
  description: string
  topicId: TopicId
  editTests: boolean
  testsForDelete: TestId[]
  testsForUpdate: UpdateTest[]
  testsForInsert: CreateTest[]
}

export type SubmitTask = {
  code: string
  plang: PLang
  taskId: TaskId
  workId: WorkId
  userId: UserId
}

export type ExecResult = {
  ok: boolean
  runtimeError: boolean
  output: string
  timeoutError?: boolean
}

export type TaskId = number
export type TestId = number
export type TopicId = number

export type Test = { input: string; output: string }

export type UpdateTest = Test & { id: TestId }

export interface CreateTask {
  name: string
  description: string
  topicId: TopicId
  tests: Test[]
}

export interface ITask {
  id: TaskId
  name: string
  description: string
  topic: { id: TopicId; name: string }
}

export type UpdateTask = {
  id: TaskId
  name: string
  description: string
  topicId: TopicId
  editTests: boolean
  testsForDelete: TestId[]
  testsForUpdate: UpdateTest[]
  testsForInsert: UpdateTest[]
}

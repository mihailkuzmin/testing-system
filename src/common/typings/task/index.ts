export type TaskId = number
export type TestId = number
export type TopicId = number

export type Topic = { id: TopicId; name: string }

export type Test = { input: string; output: string }

export type UpdateTest = Test & { id: TestId }

export type CreateTask = {
  name: string
  description: string
  topicId: TopicId
  tests: Test[]
}

export type Task = {
  id: TaskId
  name: string
  description: string
  topic: Topic
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

export type TaskPreview = {
  id: TaskId
  name: string
  description: string
  topic: string
  test: Test
}

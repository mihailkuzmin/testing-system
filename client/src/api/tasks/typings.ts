export type TestId = number
export type TaskId = number
export type UpdateTestId = number | string
export type TopicId = number

export type Test = {
  id: TestId
  input: string
  output: string
}

export type CreateTest = { input: string; output: string }

export type UpdateTest = {
  id: UpdateTestId
  input: string
  output: string
  old: boolean
}

export type Task = {
  id: TaskId
  name: string
  description: string
  topic: { id: TopicId; name: string }
}

export type CreateTask = {
  name: string
  description: string
  topicId: TopicId
  tests: CreateTest[]
}

export type UpdateTask = {
  id: TaskId
  name: string
  description: string
  topicId: TopicId
  editTests: boolean
  testsForDelete: UpdateTestId[]
  testsForUpdate: UpdateTest[]
  testsForInsert: UpdateTest[]
}

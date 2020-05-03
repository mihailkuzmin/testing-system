export type TaskId = number
export type TestId = number
export type UpdateTestId = number | string
export type TopicId = number

export type Topic = { id: TopicId; name: string }

export type Task = {
  id: TaskId
  name: string
  description: string
  topic: Topic
}

export type UpdateTest = {
  id: UpdateTestId
  input: string
  output: string
  old: boolean
}

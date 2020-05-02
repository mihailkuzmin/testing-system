export type TestId = number | string
export type TopicId = number

export type Test = {
  id: TestId
  input: string
  output: string
}

export type Topic = { id: TopicId; name: string }

export type Task = {
  name: string
  description: string
  topicId: TopicId
  tests: Test[]
}

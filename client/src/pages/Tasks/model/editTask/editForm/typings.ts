export type TaskId = number
export type TestId = number

export type Task = {
  id: TaskId
  name: string
  description: string
}

export type Test = {
  id: TestId
  input: string
  output: string
}

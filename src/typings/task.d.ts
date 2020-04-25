export type TaskId = number
export type TestId = number

export interface Test {
  input: string
  output: string
}

export interface CreateTask {
  name: string
  description: string
  tests: Test[]
}

export interface ITask {
  id: TaskId
  name: string
  description: string
}

export interface UpdateTask {
  id: TaskId
  name: string
  description: string
}

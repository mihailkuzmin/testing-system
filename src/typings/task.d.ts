export type TaskId = number
export type TestId = number

export interface Test {
  input: string
  output: string
}

export interface CreateTask {
  description: string
  tests: Test[]
}

export interface ITask {
  id: TaskId
  description: string
}

export interface UpdateTask {
  id: TaskId
  description: string
}

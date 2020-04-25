export type TestId = number
export type TaskId = number

export type Test = {
  input: string
  output: string
}

export interface Task {
  id: TaskId
  description: string
}

export interface CreateTask {
  description: string
  tests: Test[]
}

export interface UpdateTask {
  id: TaskId
  description: string
}

export type TestId = number
export type TaskId = number

export type Test = {
  input: string
  output: string
}

export interface Task {
  id: TaskId
  name: string
  description: string
}

export interface CreateTask {
  name: string
  description: string
  tests: Test[]
}

export interface UpdateTask {
  id: TaskId
  name: string
  description: string
}

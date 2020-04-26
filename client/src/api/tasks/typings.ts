export type TestId = number
export type TaskId = number

export type Test = {
  id: TestId
  input: string
  output: string
}

export type CreateTest = {
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
  tests: CreateTest[]
}

export interface UpdateTask {
  id: TaskId
  name: string
  description: string
  changeTests: boolean
  tests: Test[]
}

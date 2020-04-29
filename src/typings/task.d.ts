export type TaskId = number
export type TestId = number

export interface Test {
  input: string
  output: string
}

export type UpdateTest = Test & {
  id: TestId
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

export type UpdateTask = {
  id: TaskId
  name: string
  description: string
  editTests: boolean
  testsForDelete: TestId[]
  testsForUpdate: UpdateTest[]
  testsForInsert: UpdateTest[]
}

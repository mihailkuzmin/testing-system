export type TaskId = number
export type TestId = number
export type UpdateTestId = number | string

export type Task = {
  id: TaskId
  name: string
  description: string
}

export type UpdateTest = {
  id: UpdateTestId
  input: string
  output: string
  old: boolean
}

export type TestId = number | string
export type Test = {
  id: TestId
  input: string
  output: string
}

export type Task = {
  name: string
  description: string
  tests: Test[]
}

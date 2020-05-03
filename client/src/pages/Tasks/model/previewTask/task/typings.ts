type TaskId = number
type Test = { input: string; output: string }

export type TaskPreview = {
  id: TaskId
  name: string
  description: string
  topic: string
  test: Test
}

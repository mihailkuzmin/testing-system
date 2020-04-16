export type TaskId = number

export interface Task {
  id: TaskId
  description: string
  exampleInput: string
  exampleOutput: string
  correctOutput: string
}

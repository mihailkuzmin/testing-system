export type TaskId = number

export interface ITask {
  id: TaskId
  description: string
  exampleInput: string
  exampleOutput: string
  correctOutput: string
}

export interface CreateTask {
  description: string
  exampleInput: string
  exampleOutput: string
  correctOutput: string
}

export interface UpdateTask {
  id: TaskId
  description: string
  exampleInput: string
  exampleOutput: string
  correctOutput: string
}

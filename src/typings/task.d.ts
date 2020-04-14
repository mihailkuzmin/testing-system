export type TaskId = number

export interface TaskQueryResult {
  id: TaskId
  description: string
  input_name: string
  output_name: string
  example_intput: string
  example_output: string
  correct_output: string
}

export interface CreateTask {
  description: string
  exampleInput: string
  exampleOutput: string
  correctOutput: string
}

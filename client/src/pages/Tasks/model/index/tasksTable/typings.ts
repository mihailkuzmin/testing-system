export type TaskId = number
export type TopicId = number

export interface Task {
  id: TaskId
  name: string
  description: string
  topic: { id: TopicId; name: string }
}

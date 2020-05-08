export type TopicId = number
export type TaskId = number

export type Topic = { id: TopicId; name: string }

export type Task = {
  id: TaskId
  name: string
  description: string
  topic: Topic
}

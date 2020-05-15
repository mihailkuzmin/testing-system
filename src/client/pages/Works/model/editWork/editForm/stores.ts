import { createStore } from 'effector'
import { Task, Topic } from '@common/typings/task'
import { WorkId } from '@common/typings/work'

export const $tasks = createStore<Task[]>([])
export const $topics = createStore<Topic[]>([])
export const $selectedTopic = createStore<Topic | null>(null)

export const $selectedTasks = createStore<Task[]>([])
export const $id = createStore<WorkId | null>(null)
export const $name = createStore('')
export const $openAt = createStore(new Date())
export const $closeAt = createStore(new Date())

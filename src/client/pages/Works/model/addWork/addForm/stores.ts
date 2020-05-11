import { createStore } from 'effector'
import { TaskWithoutDescription, Topic } from '@common/typings/task'

export const $tasks = createStore<TaskWithoutDescription[]>([])
export const $topics = createStore<Topic[]>([])
export const $selectedTopic = createStore<Topic | null>(null)

export const $selectedTasks = createStore<TaskWithoutDescription[]>([])
export const $name = createStore('')
export const $openAt = createStore(new Date())
export const $closeAt = createStore(new Date())

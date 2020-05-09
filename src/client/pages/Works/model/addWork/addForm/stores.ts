import { createStore } from 'effector'
import { Task, Topic } from '@common/typings/task'

export const $tasks = createStore<Task[]>([])
export const $topics = createStore<Topic[]>([])

export const $selectedTasks = createStore<Task[]>([])

export const $selectedTopic = createStore<Topic | null>(null)

import { createStore } from 'effector'
import { Task } from './typings'

const tasks: Task[] = []

export const $tasks = createStore(tasks)
export const $taskForDelete = createStore<Task | null>(null)
export const $taskForEdit = createStore<Task | null>(null)

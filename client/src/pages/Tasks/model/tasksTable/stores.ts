import { createStore } from 'effector'
import { Task } from './typings'

const tasks: Task[] = []

export const $tasks = createStore(tasks)
export const $selectedForDelete = createStore<Task | null>(null)

import { createStore } from 'effector'
import { Task } from './typings'

export const $task = createStore<Task | null>(null)

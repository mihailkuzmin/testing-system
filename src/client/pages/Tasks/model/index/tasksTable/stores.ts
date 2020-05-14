import { createStore } from 'effector'
import { Task } from '@common/typings/task'

export const $tasks = createStore<Task[]>([])
export const $taskForDelete = createStore<Task | null>(null)
export const $taskForEdit = createStore<Task | null>(null)

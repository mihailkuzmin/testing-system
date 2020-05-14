import { createStore } from 'effector'
import { Work } from '@common/typings/work'
import { Task } from '@common/typings/task'

export const $preview = createStore<Work | null>(null)
export const $tasks = createStore<Task[]>([])

import { createStore } from 'effector'
import { Task } from '@common/typings/task'
import { Work } from '@common/typings/work'

export const $tasks = createStore<Task[]>([])
export const $taskForDelete = createStore<Task | null>(null)
export const $worksWithTask = createStore<Work[]>([])

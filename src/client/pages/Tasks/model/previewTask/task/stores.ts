import { createStore } from 'effector'
import { Task } from '@common/typings/task'

export const $taskPreview = createStore<Task | null>(null)

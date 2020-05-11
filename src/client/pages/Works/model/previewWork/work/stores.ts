import { createStore } from 'effector'
import { Work } from '@common/typings/work'
import { TaskPreview } from '@common/typings/task'

export const $preview = createStore<Work | null>(null)
export const $tasks = createStore<TaskPreview[]>([])

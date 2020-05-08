import { createStore } from 'effector'
import { TaskPreview } from './typings'

export const $taskPreview = createStore<TaskPreview | null>(null)

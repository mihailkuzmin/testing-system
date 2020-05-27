import { createStore } from 'effector'
import { PLang, PLangId, Task } from '@common/typings/task'

export const $tasks = createStore<Task[]>([])
export const $selectedTask = createStore<Task | null>(null)

export const $langs = createStore<PLang[]>([])
export const $selectedLangId = createStore<PLangId | null>(null)

export const $code = createStore('')

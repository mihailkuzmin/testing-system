import { createStore } from 'effector'
import { PLang, PLangId, Task, TaskId } from '@common/typings/task'
import { WorkId } from '@common/typings/work'
import { Tabs, Console } from './typings'

export const $workId = createStore<WorkId | null>(null)

export const $tasks = createStore<Task[]>([])
export const $selectedTaskId = createStore<TaskId | null>(null)
export const $selectedTaskInfo = createStore<Task | null>(null)

export const $langs = createStore<PLang[]>([])
export const $selectedLangId = createStore<PLangId | null>(null)

export const $code = createStore('')
export const $console = createStore<Console>({ ok: true, output: '' })

export const $selectedTab = createStore(Tabs.Editor)

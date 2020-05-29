import { createStore } from 'effector'
import { PLang, PLangId, Task, TaskId } from '@common/typings/task'
import { WorkId } from '@common/typings/work'
import { Tabs } from './typings'

export const $workId = createStore<WorkId | null>(null)

export const $tasks = createStore<Task[]>([])
export const $selectedTaskId = createStore<TaskId | null>(null)
export const $selectedTaskInfo = createStore<Task | null>(null)

export const $langs = createStore<PLang[]>([])
export const $selectedLangId = createStore<PLangId | null>(null)

export const $code = createStore('Type your code here')
export const $console = createStore('Output will be here')

export const $selectedTab = createStore(Tabs.Editor)

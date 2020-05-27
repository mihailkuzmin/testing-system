import { createStore } from 'effector'
import { PLang, PLangId, Task } from '@common/typings/task'
import { Tabs } from './typings'

export const $tasks = createStore<Task[]>([])
export const $selectedTask = createStore<Task | null>(null)

export const $langs = createStore<PLang[]>([])
export const $selectedLangId = createStore<PLangId | null>(null)

export const $code = createStore('Type your code here')
export const $console = createStore('Output will be here')

export const $selectedTab = createStore(Tabs.Editor)

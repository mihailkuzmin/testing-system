import { createStore } from 'effector'
import { Task, Topic } from '@common/typings/task'
import { Group } from '@common/typings/group'

export const $tasks = createStore<Task[]>([])

export const $groups = createStore<Group[]>([])
export const $selectedGroups = createStore<Group[]>([])

export const $topics = createStore<Topic[]>([])
export const $selectedTopic = createStore<Topic | null>(null)

export const $selectedTasks = createStore<Task[]>([])
export const $name = createStore('')
export const $openAt = createStore(new Date())
export const $closeAt = createStore(new Date())

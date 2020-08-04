import { createStore } from 'effector'
import { TaskResult } from '@common/typings/report'
import { Work } from '@common/typings/work'
import { User } from '@common/typings/user'
import { Task, TaskId } from '@common/typings/task'

export const $tasksResults = createStore<TaskResult[]>([])

export const $work = createStore<Work | null>(null)
export const $tasksCount = createStore(0)

export const $user = createStore<User | null>(null)

export const $selectedTask = createStore<Task | null>(null)

export const $selectedTaskId = createStore<TaskId | null>(null)

import { createStore } from 'effector'
import { Work, WorkId } from '@common/typings/work'
import { User } from '@common/typings/user'

export const $works = createStore<Work[]>([])

export const $selectedWork = createStore<WorkId | null>(null)

export const $users = createStore<User[]>([])

import { createStore } from 'effector'
import { Work, WorkId } from '@common/typings/work'
import { User } from '@common/typings/user'
import { Group, GroupId } from '@common/typings/group'

export const $works = createStore<Work[]>([])

export const $selectedWorkId = createStore<WorkId | null>(null)

export const $groups = createStore<Group[]>([])

export const $selectedGroupId = createStore<GroupId | null>(null)

export const $users = createStore<User[]>([])

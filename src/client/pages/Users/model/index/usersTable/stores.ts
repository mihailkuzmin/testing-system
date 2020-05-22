import { createStore } from 'effector'
import { User } from '@common/typings/user'
import { Group, GroupId } from '@common/typings/group'

export const $users = createStore<User[]>([])

export const $groups = createStore<Group[]>([])
export const $selectedGroupId = createStore<GroupId | null>(null)

export const $selectedForDelete = createStore<User | null>(null)
export const $deleteDialogIsOpen = $selectedForDelete.map(Boolean)

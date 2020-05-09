import { createStore } from 'effector'
import { Group } from '@common/typings/group'
import { Status } from '@typings'

const groups: Group[] = []

export const $groups = createStore<Group[]>(groups)

export const $getGroupsStatus = createStore<Status>(Status.Pending)

export const $selectedForDelete = createStore<Group | null>(null)
export const $deleteDialogIsOpen = $selectedForDelete.map(Boolean)

import { createStore } from 'effector'
import { Student } from '@common/typings/student'
import { Group, GroupId } from '@common/typings/group'

export const $users = createStore<Student[]>([])

export const $groups = createStore<Group[]>([])
export const $selectedGroupId = createStore<GroupId | null>(null)

export const $selectedForDelete = createStore<Student | null>(null)
export const $deleteDialogIsOpen = $selectedForDelete.map(Boolean)

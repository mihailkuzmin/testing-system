import { createStore } from 'effector'
import { Group } from '../typings'
import { Status } from '../../../../typings'

const groups: Group[] = []

export const $groups = createStore<Group[]>(groups)

export const $getGroupsStatus = createStore<Status>(Status.Pending)

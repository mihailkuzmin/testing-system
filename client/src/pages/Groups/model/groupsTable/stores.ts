import { createStore } from 'effector'
import { Group } from '../typings'

const groups: Group[] = []

export const $groups = createStore<Group[]>(groups)

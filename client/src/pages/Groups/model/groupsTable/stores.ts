import { createStore } from 'effector'
import { Group } from '../typings'

const groups = [
  { id: 1, name: 'АП-31' },
  { id: 2, name: 'УС-31' },
  { id: 3, name: 'АП-21' },
]

export const $groups = createStore<Group[]>(groups)

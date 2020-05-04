import { createStore } from 'effector'
import { Work } from './typings'

export const $works = createStore<Work[]>([])

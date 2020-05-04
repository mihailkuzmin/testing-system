import { createStore } from 'effector'
import { Work } from './typings'

export const $works = createStore<Work[]>([])

export const $selectedForDelete = createStore<Work | null>(null)
export const $deleteDialogIsOpen = $selectedForDelete.map(Boolean)

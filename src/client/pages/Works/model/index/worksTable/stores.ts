import { createStore } from 'effector'
import { Work } from '@common/typings/work'

export const $works = createStore<Work[]>([])

export const $selectedForDelete = createStore<Work | null>(null)
export const $deleteDialogIsOpen = $selectedForDelete.map(Boolean)

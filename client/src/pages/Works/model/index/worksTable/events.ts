import { createEvent } from 'effector'
import { WorkId } from './typings'

export const selectForDelete = createEvent<WorkId>()
export const cancelDelete = createEvent()
export const confirmDelete = createEvent()

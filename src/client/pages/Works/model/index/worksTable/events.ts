import { createEvent } from 'effector'
import { WorkId } from '@common/typings/work'

export const selectForDelete = createEvent<WorkId>()
export const cancelDelete = createEvent()
export const confirmDelete = createEvent()

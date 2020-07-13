import { createEvent } from 'effector'
import { WorkId } from '@common/typings/work'

export const open = createEvent()
export const close = createEvent()

export const loadUsers = createEvent<WorkId>()
export const cancelLoadUsers = createEvent()

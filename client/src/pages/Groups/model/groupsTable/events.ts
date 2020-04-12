import { createEvent } from 'effector'
import { GroupId } from '../typings'

export const groupsRefreshed = createEvent()

export const selectForDelete = createEvent<GroupId>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()
export const groupDeleted = createEvent()

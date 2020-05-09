import { createEvent } from 'effector'
import { GroupId } from '@common/typings/group'

export const refreshGroups = createEvent()

export const selectForDelete = createEvent<GroupId>()
export const selectForEdit = createEvent<GroupId>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()
export const groupDeleted = createEvent()

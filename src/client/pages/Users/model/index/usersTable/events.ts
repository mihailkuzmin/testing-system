import { createEvent } from 'effector'
import { GroupId } from '@common/typings/group'
import { UserId } from '@common/typings/user'

export const groupChanged = createEvent<GroupId>()

export const selectForDelete = createEvent<UserId>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()

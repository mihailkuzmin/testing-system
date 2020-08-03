import { createEvent } from 'effector'
import { WorkId } from '@common/typings/work'
import { GroupId } from '@common/typings/group'

export const open = createEvent()
export const close = createEvent()

export const selectWork = createEvent<WorkId>()
export const unselectWork = createEvent()

export const selectGroup = createEvent<GroupId>()
export const unselectGroup = createEvent()

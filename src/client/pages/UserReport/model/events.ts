import { createEvent } from 'effector'
import { WorkId } from '@common/typings/work'
import { UserId } from '@common/typings/user'
import { GroupId } from '@common/typings/group'

export const open = createEvent<{ workId: WorkId; userId: UserId; groupId: GroupId }>()
export const close = createEvent()
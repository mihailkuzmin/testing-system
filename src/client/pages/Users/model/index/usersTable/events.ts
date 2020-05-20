import { createEvent } from 'effector'
import { GroupId } from '@common/typings/group'
import { StudentId } from '@common/typings/student'

export const groupChanged = createEvent<GroupId>()

export const selectForDelete = createEvent<StudentId>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()

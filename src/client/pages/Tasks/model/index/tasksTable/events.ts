import { createEvent } from 'effector'
import { TaskId } from '@common/typings/task'

export const selectForDelete = createEvent<TaskId>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()
export const deleteTask = createEvent()

export const addTask = createEvent()

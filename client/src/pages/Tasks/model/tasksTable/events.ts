import { createEvent } from 'effector'
import { TaskId } from './typings'

export const selectForDelete = createEvent<TaskId>()
export const editTask = createEvent<TaskId>()
export const addTask = createEvent()
export const confirmDelete = createEvent<TaskId>()
export const cancelDelete = createEvent()

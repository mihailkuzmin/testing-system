import { createEvent } from 'effector'
import { TaskId } from './typings'

export const selectForDelete = createEvent<TaskId>()
export const confirmDelete = createEvent<TaskId>()
export const cancelDelete = createEvent()

export const confirmEdit = createEvent()
export const cancelEdit = createEvent()

export const addTask = createEvent()

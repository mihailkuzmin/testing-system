import { createEvent } from 'effector'
import { TaskId } from './typings'

export const deleteTask = createEvent<TaskId>()
export const editTask = createEvent<TaskId>()
export const addTask = createEvent()

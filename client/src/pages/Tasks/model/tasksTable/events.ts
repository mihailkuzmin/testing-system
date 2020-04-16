import { createEvent } from 'effector'
import { TaskId } from './typings'

export const deleteTask = createEvent<TaskId>()

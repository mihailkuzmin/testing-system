import { createEvent } from 'effector'
import { TaskId, TopicId } from '@common/typings/task'

export const topicChange = createEvent<TopicId>()

export const addTask = createEvent<TaskId>()
export const deleteTask = createEvent<TaskId>()

export const nameChange = createEvent<string>()
export const openAtChange = createEvent<Date>()
export const closeAtChange = createEvent<Date>()

export const addWork = createEvent()

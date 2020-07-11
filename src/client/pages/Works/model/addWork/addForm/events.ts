import { createEvent } from 'effector'
import { TaskId, TopicId } from '@common/typings/task'
import { GroupId } from '@common/typings/group'

export const topicChange = createEvent<TopicId>()

export const addGroup = createEvent<GroupId>()
export const removeGroup = createEvent<GroupId>()

export const addTask = createEvent<TaskId>()
export const deleteTask = createEvent<TaskId>()

export const nameChange = createEvent<string>()
export const openAtChange = createEvent<Date>()
export const closeAtChange = createEvent<Date>()
export const timeToCompleteChange = createEvent<Date>()

export const addWork = createEvent()

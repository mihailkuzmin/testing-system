import { createEvent } from 'effector'
import { CreateTestId, TopicId } from '@common/typings/task'

export const addTest = createEvent()
export const removeTest = createEvent<CreateTestId>()

export const inputChange = createEvent<{ id: CreateTestId; value: string }>()
export const outputChange = createEvent<{ id: CreateTestId; value: string }>()
export const descriptionChange = createEvent<string>()
export const nameChange = createEvent<string>()
export const topicChange = createEvent<TopicId>()

export const createTask = createEvent()

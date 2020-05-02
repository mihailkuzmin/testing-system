import { createEvent } from 'effector'
import { TestId, TopicId } from './typings'

export const addTest = createEvent()
export const removeTest = createEvent<TestId>()

export const inputChange = createEvent<{ id: TestId; value: string }>()
export const outputChange = createEvent<{ id: TestId; value: string }>()
export const descriptionChange = createEvent<string>()
export const nameChange = createEvent<string>()
export const topicChange = createEvent<TopicId>()

export const createTask = createEvent()

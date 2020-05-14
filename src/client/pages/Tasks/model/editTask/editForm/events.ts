import { createEvent } from 'effector'
import { TopicId, UpdateTestId } from '@common/typings/task'

export const toggleEditTests = createEvent<boolean>()

export const inputChange = createEvent<{ id: UpdateTestId; value: string }>()
export const outputChange = createEvent<{ id: UpdateTestId; value: string }>()
export const nameChange = createEvent<string>()
export const descriptionChange = createEvent<string>()
export const topicChange = createEvent<TopicId>()

export const addTest = createEvent()
export const removeTest = createEvent<{ id: UpdateTestId; old: boolean }>()

export const saveChanges = createEvent()

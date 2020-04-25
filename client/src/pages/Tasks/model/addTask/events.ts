import { createEvent } from 'effector'
import { TestId } from './typings'

export const addTest = createEvent()
export const removeTest = createEvent()

export const inputChange = createEvent<{ id: TestId; value: string }>()
export const outputChange = createEvent<{ id: TestId; value: string }>()
export const descriptionChange = createEvent<string>()

export const createTask = createEvent()

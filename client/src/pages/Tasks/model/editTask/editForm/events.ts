import { createEvent } from 'effector'
import { UpdateTestId } from './typings'

export const toggleEditTests = createEvent<boolean>()

export const inputChange = createEvent<{ id: UpdateTestId; value: string }>()
export const outputChange = createEvent<{ id: UpdateTestId; value: string }>()
export const nameChange = createEvent<string>()
export const descriptionChange = createEvent<string>()

export const addTest = createEvent()
export const removeTest = createEvent<{ id: UpdateTestId; old: boolean }>()
export const removeOldTest = removeTest.filter({ fn: ({ old }) => old })

export const saveChanges = createEvent()

import { createEvent } from 'effector'
import { AddFormNewValue, AddForm } from './typings'

export const openAddModal = createEvent()
export const closeAddModal = createEvent()

export const setField = createEvent<AddFormNewValue>()
export const fieldValueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: number | string }>) => {
    return {
      key: e.target.name,
      value: e.target.value,
    }
  },
)

export const closeMessage = createEvent()

export const createUser = createEvent<AddForm>()
export const getAllUsers = createEvent()

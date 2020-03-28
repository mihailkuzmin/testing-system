import { createEvent } from 'effector'
import { AddFormNewValue } from './typings'

export const openAddModal = createEvent()
export const closeAddModal = createEvent()

export const setField = createEvent<AddFormNewValue>()
export const fieldValueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: string }>) => {
    return {
      key: e.target.name,
      value: e.target.value,
    }
  },
)

import { createEvent } from 'effector'
import { AddFormNewValue } from './typings'

export const openAddModal = createEvent()
export const closeAddModal = createEvent()

export const setField = createEvent<AddFormNewValue>()
export const valueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: number | string }>) => {
    return {
      key: e.currentTarget.name,
      value: e.currentTarget.value,
    }
  },
)

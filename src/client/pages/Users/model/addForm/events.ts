import { createEvent } from 'effector'
import { AddFormNewValue } from './typings'

export const setField = createEvent<AddFormNewValue>()
export const fieldValueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: number | string }>) => {
    return {
      key: e.target.name,
      value: e.target.value,
    }
  },
)

export const createUser = createEvent()

export const userCreated = createEvent()

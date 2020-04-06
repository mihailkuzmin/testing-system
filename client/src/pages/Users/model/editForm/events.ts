import { createEvent } from 'effector'
import { EditFormNewValue } from './typings'

export const setField = createEvent<EditFormNewValue>()
export const fieldValueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: number | string }>) => {
    return {
      key: e.target.name,
      value: e.target.value,
    }
  },
)

export const editUser = createEvent()

export const userUpdated = createEvent()

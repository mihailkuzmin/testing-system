import { createEvent } from 'effector'
import { EditFormEvent, EditFormValue } from './typings'

export const setField = createEvent<EditFormEvent>()
export const fieldValueChange = setField.prepend(
  (e: React.ChangeEvent<{ name: string; value: EditFormValue }>) => {
    return {
      key: e.target.name,
      value: e.target.value,
    }
  },
)

export const editUser = createEvent()

export const userUpdated = createEvent()

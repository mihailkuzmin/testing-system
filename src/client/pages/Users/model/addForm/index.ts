import { sample, forward } from 'effector'
import { Status, MessageType } from '@typings'
import { notifications } from '@model'
import { addModal } from '../addModal'
import { usersTable } from '../usersTable'
import { $addForm, addFormInitialState, $createUserStatus } from './stores'
import { setField, fieldValueChange, createUser, userCreated } from './events'
import { createUserFx } from './effects'

forward({ from: createUserFx.done, to: userCreated })

const initialSelectValue = sample({
  source: usersTable.$groupSelect,
  clock: addModal.openAddModal,
  fn: ({ value }) => value,
})

$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.on(initialSelectValue, (state, group) => ({ ...state, group }))
$addForm.on(userCreated, (form) => ({
  ...addFormInitialState,
  group: form.group,
}))
$addForm.reset(addModal.closeAddModal)

sample({
  source: $addForm,
  clock: createUser,
  target: createUserFx,
})

$createUserStatus.on(createUserFx.done, () => Status.Done)
$createUserStatus.on(createUserFx.fail, () => Status.Fail)
$createUserStatus.on(createUserFx.pending, (s, p) => (p ? Status.Pending : s))
$createUserStatus.reset(setField, addModal.closeAddModal, createUser)

createUserFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ type: MessageType.Success, text: message })
  }
})

createUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const addForm = {
  $addForm,
  $createUserStatus,
  fieldValueChange,
  createUser,
}

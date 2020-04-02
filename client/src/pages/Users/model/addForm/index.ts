import { sample } from 'effector'
import { $addForm, $groups, $createUserStatus } from './stores'
import { setField, fieldValueChange, createUser } from './events'
import { createUserFx } from './effects'
import { Status, MessageType } from '../../../../typings'
import { addModal } from '../addModal'
import { notifications } from '../../../../model'

$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(addModal.closeAddModal, createUserFx.done)

$createUserStatus.on(createUserFx.done, () => Status.Done)
$createUserStatus.on(createUserFx.fail, () => Status.Fail)
$createUserStatus.on(createUserFx.pending, (s, p) => (p ? Status.Pending : s))
$createUserStatus.reset(setField, addModal.closeAddModal, createUser)

createUserFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

createUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

sample({
  source: $addForm,
  clock: createUser,
  target: createUserFx,
})

export const addForm = {
  $addForm,
  $groups,
  $createUserStatus,
  fieldValueChange,
  createUser,
}

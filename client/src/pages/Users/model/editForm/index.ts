import { sample, forward } from 'effector'
import { editUserFx } from './effects'
import { $editForm, $editUserStatus } from './stores'
import { setField, fieldValueChange, editUser, userUpdated } from './events'
import { Status, MessageType } from '../../../../typings'
import { notifications } from '../../../../model'
import { editModal } from '../editModal'
import { usersTable } from '../usersTable'

forward({ from: editUserFx.done, to: userUpdated })
forward({ from: usersTable.selectForEdit, to: editModal.openEditModal })

$editForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$editForm.reset(editModal.closeEditModal, editUserFx.done)

sample({
  source: $editForm,
  clock: editUser,
  target: editUserFx,
})

$editUserStatus.on(editUserFx.done, () => Status.Done)
$editUserStatus.on(editUserFx.fail, () => Status.Fail)
$editUserStatus.on(editUserFx.pending, (s, p) => (p ? Status.Pending : s))
$editUserStatus.reset(setField, userUpdated, editModal.closeEditModal)

editUserFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

editUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const editForm = {
  $editForm,
  $editUserStatus,
  fieldValueChange,
  editUser,
}

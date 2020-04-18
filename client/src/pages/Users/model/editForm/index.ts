import { sample, forward } from 'effector'
import { editUserFx, getUserFx } from './effects'
import { $editForm, $editUserStatus, $getUserStatus } from './stores'
import { setField, fieldValueChange, editUser, userUpdated } from './events'
import { Status, MessageType } from '../../../../typings'
import { notifications } from '../../../../model'
import { editModal } from '../editModal'
import { usersTable } from '../usersTable'

forward({ from: editUserFx.done, to: userUpdated })
forward({
  from: userUpdated,
  to: [editModal.closeEditModal, usersTable.refreshUsers],
})

// prevent display old data when modal closed before content loaded
forward({ from: editModal.closeEditModal, to: getUserFx.cancel })

forward({ from: usersTable.selectForEdit, to: getUserFx })

$editForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$editForm.on(getUserFx.doneData, (state, { payload }) => {
  const selectValue = payload.group.id
  return { ...state, ...payload, group: selectValue }
})
$editForm.reset(editModal.closeEditModal)

sample({
  source: $editForm,
  clock: editUser,
  target: editUserFx,
})

$editUserStatus.on(editUserFx.done, () => Status.Done)
$editUserStatus.on(editUserFx.fail, () => Status.Fail)
$editUserStatus.on(editUserFx.pending, (s, p) => (p ? Status.Pending : s))
$editUserStatus.reset(setField, userUpdated, editModal.closeEditModal)

$getUserStatus.on(getUserFx.done, () => Status.Done)
$getUserStatus.on(getUserFx.fail, () => Status.Fail)
$getUserStatus.reset(editModal.closeEditModal)

editUserFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

editUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const editForm = {
  $editForm,
  $editUserStatus,
  $getUserStatus,
  fieldValueChange,
  editUser,
}

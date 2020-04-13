import { sample, forward } from 'effector'
import { editGroupFx, getGroupFx } from './effects'
import { $editForm, $editGroupStatus, $getGroupStatus } from './stores'
import { setField, fieldValueChange, editGroup, groupUpdated } from './events'
import { Status, MessageType } from '../../../../typings'
import { notifications } from '../../../../model'
import { editModal } from '../editModal'
import { groupsTable } from '../groupsTable'

forward({ from: editGroupFx.done, to: groupUpdated })
forward({
  from: groupUpdated,
  to: [editModal.closeEditModal, groupsTable.refreshGroups],
})

// fetch group on edit click
forward({ from: groupsTable.selectForEdit, to: getGroupFx })

$editForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$editForm.on(getGroupFx.doneData, (_, { payload }) => payload)
$editForm.reset(editModal.closeEditModal)

sample({
  source: $editForm,
  clock: editGroup,
  target: editGroupFx,
})

$editGroupStatus.on(editGroupFx.done, () => Status.Done)
$editGroupStatus.on(editGroupFx.fail, () => Status.Fail)
$editGroupStatus.on(editGroupFx.pending, (s, p) => (p ? Status.Pending : s))
$editGroupStatus.reset(setField, groupUpdated, editModal.closeEditModal)

$getGroupStatus.on(getGroupFx.done, () => Status.Done)
$getGroupStatus.on(getGroupFx.fail, () => Status.Fail)
$getGroupStatus.reset(editModal.closeEditModal)

editGroupFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

editGroupFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const editForm = {
  $editForm,
  $editGroupStatus,
  $getGroupStatus,
  fieldValueChange,
  editGroup,
}

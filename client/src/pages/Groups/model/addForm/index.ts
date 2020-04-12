import { sample, forward } from 'effector'
import { $addForm, $createGroupStatus } from './stores'
import { setField, fieldValueChange, createGroup, groupCreated } from './events'
import { createGroupFx } from './effects'
import { addModal } from '../addModal'
import { Status, MessageType } from '../../../../typings'
import { notifications } from '../../../../model'

forward({ from: createGroupFx.done, to: groupCreated })

$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(addModal.closeAddModal, groupCreated)

sample({
  source: $addForm,
  clock: createGroup,
  target: createGroupFx,
})

$createGroupStatus.on(createGroupFx.done, () => Status.Done)
$createGroupStatus.on(createGroupFx.fail, () => Status.Fail)
$createGroupStatus.on(createGroupFx.pending, (s, p) => (p ? Status.Pending : s))
$createGroupStatus.reset(setField, addModal.closeAddModal, createGroup)

createGroupFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

createGroupFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const addForm = {
  $addForm,
  $createGroupStatus,
  fieldValueChange,
  createGroup,
  groupCreated,
}

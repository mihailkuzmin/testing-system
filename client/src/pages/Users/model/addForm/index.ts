import { sample, forward } from 'effector'
import {
  $addForm,
  $groups,
  $createUserStatus,
  $getAllGroupsStatus,
} from './stores'
import { setField, fieldValueChange, createUser } from './events'
import { createUserFx, getAllGroupsFx } from './effects'
import { Status, MessageType } from '../../../../typings'
import { addModal } from '../addModal'
import { notifications } from '../../../../model'

$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(addModal.closeAddModal, createUserFx.done)

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
  notifications.createMessage({ type: MessageType.Success, text: message })
})

createUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

forward({ from: addModal.openAddModal, to: getAllGroupsFx })

$getAllGroupsStatus.on(getAllGroupsFx.done, () => Status.Done)
$getAllGroupsStatus.on(getAllGroupsFx.fail, () => Status.Fail)
$getAllGroupsStatus.on(getAllGroupsFx.pending, (s, p) =>
  p ? Status.Pending : s,
)
$getAllGroupsStatus.reset(addModal.closeAddModal)

$groups.on(getAllGroupsFx.doneData, (_, {payload}) => payload)
$groups.reset(addModal.closeAddModal)

export const addForm = {
  $addForm,
  $groups,
  $createUserStatus,
  $getAllGroupsStatus,
  fieldValueChange,
  createUser,
}

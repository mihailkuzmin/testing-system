import { sample } from 'effector'
import {
  $addModal,
  $addForm,
  $createUserStatus,
  $users,
  $groups,
} from './stores'
import {
  openAddModal,
  closeAddModal,
  setField,
  createUser,
  fieldValueChange,
} from './events'
import { create } from './effects'
import { Status, MessageType } from '../../../typings'
import { app } from '../../../model'

// Add user modal
$addModal.on(openAddModal, (_, __) => ({ open: true }))
$addModal.on(closeAddModal, (_, __) => ({ open: false }))

// Add user form
$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(closeAddModal, create.done)

// Create user operation state
$createUserStatus.on(create.done, () => Status.Done)
$createUserStatus.on(create.fail, () => Status.Fail)
$createUserStatus.on(create.pending, (state, pending) => {
  return pending ? Status.Pending : state
})
$createUserStatus.reset(setField, closeAddModal, createUser)

create.doneData.watch(({ message }) => {
  app.createMessage({ type: MessageType.Success, text: message })
})

create.failData.watch(({ message }) => {
  app.createMessage({ type: MessageType.Error, text: message })
})

// When createUser emits, place value of
// $addForm in effects.createUser
sample({
  source: $addForm,
  clock: createUser,
  target: create,
})

// export public api
export const users = {
  $addForm,
  $addModal,
  $groups,
  $users,
  $createUserStatus,
  createUser,
  openAddModal,
  closeAddModal,
  fieldValueChange,
}

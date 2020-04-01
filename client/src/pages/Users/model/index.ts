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
import * as effects from './effects'
import { Status } from '../../../typings'

// Add user modal
$addModal.on(openAddModal, (_, __) => ({ open: true }))
$addModal.on(closeAddModal, (_, __) => ({ open: false }))

// Add user form
$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(closeAddModal, effects.createUser.done)

// Create user operation state
$createUserStatus.on(effects.createUser.done, () => Status.Done)
$createUserStatus.on(effects.createUser.fail, () => Status.Fail)
$createUserStatus.on(effects.createUser.pending, (state, pending) => {
  return pending ? Status.Pending : state
})
$createUserStatus.reset(setField, closeAddModal, createUser)

// When createUser emits, place value of
// $addForm in effects.createUser
sample({
  source: $addForm,
  clock: createUser,
  target: effects.createUser,
})

export const stores = {
  $addForm,
  $addModal,
  $groups,
  $users,
  $createUserStatus,
}

export const events = {
  createUser,
  openAddModal,
  closeAddModal,
  fieldValueChange,
}

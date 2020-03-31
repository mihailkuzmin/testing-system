import { sample } from 'effector'
import * as stores from './stores'
import * as events from './events'
import * as effects from './effects'
import { Status } from '../../../typings'

export { stores, events }

// Modal for form
stores.$addModal.on(events.openAddModal, (state, _) => ({
  ...state,
  open: true,
}))
stores.$addModal.on(events.closeAddModal, (state, _) => ({
  ...state,
  open: false,
}))

// Form store
stores.$addForm.on(events.setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
stores.$addForm.reset(events.closeAddModal, effects.createUser.done)

stores.$createUserStatus.on(effects.createUser.done, () => Status.Done)
stores.$createUserStatus.on(effects.createUser.fail, () => Status.Fail)
stores.$createUserStatus.on(effects.createUser.pending, (state, pending) => {
  return pending ? Status.Pending : state
})
stores.$createUserStatus.reset(
  events.setField,
  events.closeAddModal,
  events.createUser,
)

sample({
  source: stores.$addForm,
  clock: events.createUser,
  target: effects.createUser,
})

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
stores.$addForm.reset(events.closeAddModal, effects.create.done)

// Info messages
stores.$addFormMessage.on(effects.create.failData, (_, { message }) => ({
  status: Status.Fail,
  message,
  open: true,
}))
stores.$addFormMessage.on(effects.create.pending, (state, pending) => {
  return pending ? { status: Status.Pending, message: '', open: false } : state
})
stores.$addFormMessage.on(effects.create.doneData, (_, { message }) => ({
  status: Status.Done,
  message,
  open: true,
}))
stores.$addFormMessage.reset(
  events.closeMessage,
  events.setField,
  events.closeAddModal,
)

sample({
  source: stores.$addForm,
  clock: events.createUser,
  target: effects.create,
})

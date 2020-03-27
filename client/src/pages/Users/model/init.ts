import { combine } from 'effector'
import { $users, $addModal, $addFormValues } from './stores'
import * as events from './events'

$addModal.on(events.openAddModal, (state, _) => ({ ...state, open: true }))
$addModal.on(events.closeAddModal, (state, _) => ({ ...state, open: false }))

$addFormValues.on(events.setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addFormValues.reset(events.closeAddModal)

export const $page = combine($users, $addModal)

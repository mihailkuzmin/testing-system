import { combine } from 'effector'
import { $groups, $addModal, $addForm } from './stores'
import * as events from './events'

$addModal.on(events.openAddModal, (state, _) => ({ ...state, open: true }))
$addModal.on(events.closeAddModal, (state, _) => ({ ...state, open: false }))

$addForm.on(events.setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(events.closeAddModal)

export const $page = combine($groups, $addModal)

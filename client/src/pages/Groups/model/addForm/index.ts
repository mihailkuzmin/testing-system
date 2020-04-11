import { $addForm } from './stores'
import { setField, fieldValueChange } from './events'
import { addModal } from '../addModal'

$addForm.on(setField, (state, { key, value }) => ({
  ...state,
  [key]: value,
}))
$addForm.reset(addModal.closeAddModal)

export const addForm = {
  $addForm,
  fieldValueChange,
}

import { $addModal } from './stores'
import { openAddModal, closeAddModal } from './events'

$addModal.on(openAddModal, () => ({ open: true }))
$addModal.on(closeAddModal, () => ({ open: false }))

export const addModal = {
  $addModal,
  openAddModal,
  closeAddModal,
}

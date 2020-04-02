import { $addModal } from './stores'
import { openAddModal, closeAddModal } from './events'

$addModal.on(openAddModal, (_, __) => ({ open: true }))
$addModal.on(closeAddModal, (_, __) => ({ open: false }))

export const addModal = {
  $addModal,
  openAddModal,
  closeAddModal,
}

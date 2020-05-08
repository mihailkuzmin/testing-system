import { createStore, createEvent } from 'effector'

interface EditModal {
  open: boolean
}

export const $editModal = createStore<EditModal>({ open: false })

const openEditModal = createEvent()
const closeEditModal = createEvent()

$editModal.on(openEditModal, () => ({ open: true }))
$editModal.reset(closeEditModal)

export const editModal = {
  $editModal,
  openEditModal,
  closeEditModal,
}

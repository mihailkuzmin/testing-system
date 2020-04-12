import { createStore, createEvent } from 'effector'

interface DeleteModal {
  open: boolean
}

export const $deleteModal = createStore<DeleteModal>({ open: false })

const openDeleteModal = createEvent()
const closeDeleteModal = createEvent()

$deleteModal.on(openDeleteModal, () => ({ open: true }))
$deleteModal.reset(closeDeleteModal)

export const deleteModal = {
  $deleteModal,
  openDeleteModal,
  closeDeleteModal,
}

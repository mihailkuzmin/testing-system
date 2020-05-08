import { createStore, createEvent } from 'effector'

interface AddModal {
  open: boolean
}

export const $addModal = createStore<AddModal>({ open: false })

const openAddModal = createEvent()
const closeAddModal = createEvent()

$addModal.on(openAddModal, () => ({ open: true }))
$addModal.reset(closeAddModal)

export const addModal = {
  $addModal,
  openAddModal,
  closeAddModal,
}

import { createStore } from 'effector'
import { AddModal } from './typings'

const addModal: AddModal = {
  open: false,
}

export const $addModal = createStore(addModal)

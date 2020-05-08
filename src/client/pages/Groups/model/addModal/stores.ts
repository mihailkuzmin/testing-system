import { createStore } from 'effector'
import { AddModal } from '../typings'

const addModal = {
  open: false,
}

export const $addModal = createStore<AddModal>(addModal)

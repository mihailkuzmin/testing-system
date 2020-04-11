import { createStore } from 'effector'
import { AddForm } from '../typings'

const addForm = {
  name: '',
}

export const $addForm = createStore<AddForm>(addForm)

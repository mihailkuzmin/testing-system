import { createStore } from 'effector'
import { AddForm } from '../typings'
import { Status } from '@typings'

const addForm = {
  name: '',
}

export const $addForm = createStore<AddForm>(addForm)

export const $createGroupStatus = createStore<Status>(Status.Idle)

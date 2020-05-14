import { createStore } from 'effector'
import { Status } from '@typings'
import { AddForm } from './typings'

export const addFormInitialState: AddForm = {
  firstName: '',
  lastName: '',
  patronymic: '',
  group: '',
  bookNumber: '',
  login: '',
  password: '',
}

export const $addForm = createStore<AddForm>(addFormInitialState)

export const $createUserStatus = createStore<Status>(Status.Idle)

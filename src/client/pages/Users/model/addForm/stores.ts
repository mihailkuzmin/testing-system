import { createStore } from 'effector'
import { AddForm } from './typings'
import { Status } from '@typings'

export const addFormIntitialState: AddForm = {
  firstName: '',
  lastName: '',
  patronymic: '',
  group: '',
  bookNumber: '',
  login: '',
  password: '',
}

export const $addForm = createStore<AddForm>(addFormIntitialState)

export const $createUserStatus = createStore<Status>(Status.Idle)

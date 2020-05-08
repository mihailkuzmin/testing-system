import { createStore } from 'effector'
import { EditForm } from './typings'
import { Status } from '@typings'

const editForm: EditForm = {
  id: 0,
  firstName: '',
  lastName: '',
  patronymic: '',
  group: '',
  bookNumber: '',
  login: '',
  changePassword: false,
  password: '',
}

export const $editForm = createStore<EditForm>(editForm)

export const $editUserStatus = createStore<Status>(Status.Idle)
export const $getUserStatus = createStore<Status>(Status.Pending)

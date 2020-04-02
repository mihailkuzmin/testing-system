import { createStore } from 'effector'
import { AddForm, Group } from './typings'
import { Status } from '../../../../typings'

const addForm: AddForm = {
  name: '',
  group: '',
  login: '',
  password: '',
}

export const $addForm = createStore<AddForm>(addForm)

export const $createUserStatus = createStore<Status>(Status.Idle)

export const $getAllGroupsStatus = createStore<Status>(Status.Pending)

export const $groups = createStore<Group[]>([])

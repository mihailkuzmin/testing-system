import { createStore } from 'effector'
import { Status } from '@typings'
import { EditForm } from './typings'

const editForm: EditForm = {
  id: 0,
  name: '',
}

export const $editForm = createStore<EditForm>(editForm)

export const $editGroupStatus = createStore<Status>(Status.Idle)
export const $getGroupStatus = createStore<Status>(Status.Pending)

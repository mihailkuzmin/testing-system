import { createStore } from 'effector'
import { Status } from '@typings'
import { AddForm } from '../typings'

const addForm = { name: '' }

export const $addForm = createStore<AddForm>(addForm)

export const $createGroupStatus = createStore<Status>(Status.Idle)

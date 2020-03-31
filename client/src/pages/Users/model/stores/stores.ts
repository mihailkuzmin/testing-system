import { createStore } from 'effector'
import * as states from './initialStates'
import { User, AddModal, Group, AddForm } from '../typings'
import { Status } from '../../../../typings'

export const $users = createStore<User[]>(states.users)

export const $groups = createStore<Group[]>(states.groups)

export const $addModal = createStore<AddModal>(states.addModal)

export const $addForm = createStore<AddForm>(states.addForm)

export const $createUserStatus = createStore<Status>(states.createUserStatus)

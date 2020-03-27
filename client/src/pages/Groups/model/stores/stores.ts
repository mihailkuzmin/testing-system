import {createStore} from 'effector'
import {Group, AddModal, AddForm} from '../typings'
import * as states from './initialStates'

export const $groups = createStore<Group[]>(states.groups)

export const $addModal = createStore<AddModal>(states.addModal)

export const $addFormValues = createStore<AddForm>(states.addForm)
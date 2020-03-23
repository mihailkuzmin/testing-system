import {combine} from 'effector'
import { $users, $addModal } from './stores'
import {openAddModal, closeAddModal} from './events'

$addModal.on(openAddModal, (state, _) => ({...state, open: true}))
$addModal.on(closeAddModal, (state, _) => ({...state, open: false}))

export const $model = combine($users, $addModal)
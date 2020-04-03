import { createStore } from 'effector'
import { UsersTableRow } from '../../../../typings'
import { Status } from '../../../../typings'

const users: UsersTableRow[] = []

export const $users = createStore<UsersTableRow[]>(users)

export const $getAllUsersStatus = createStore<Status>(Status.Pending)

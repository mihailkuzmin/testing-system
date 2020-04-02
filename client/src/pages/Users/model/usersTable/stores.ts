import { createStore } from 'effector'
import { User } from './typings'
import { Status } from '../../../../typings'

const users: User[] = []

export const $users = createStore<User[]>(users)

export const $getAllUsersStatus = createStore<Status>(Status.Pending)

import { createStore } from 'effector'
import { User } from './typings'

const users: User[] = []

export const $users = createStore(users)

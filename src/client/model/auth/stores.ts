import { createStore } from 'effector'
import { UserInfo } from '@common/typings/auth'

export const $user = createStore<UserInfo | null>(null)
export const $isAuth = $user.map(Boolean)

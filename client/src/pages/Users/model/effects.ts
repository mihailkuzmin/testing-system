import { createEffect } from 'effector'
import { usersApi } from '../../../api/users'

export const getAll = createEffect({ handler: usersApi.getAll })
export const create = createEffect({ handler: usersApi.create })

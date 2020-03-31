import { createEffect } from 'effector'
import { usersApi } from '../../../api/users'

export const getAllUsers = createEffect({ handler: usersApi.getAll })
export const createUser = createEffect({ handler: usersApi.create })

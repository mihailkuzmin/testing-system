import { createEffect } from 'effector'
import { usersApi } from '../../../../api/users'

export const getAllUsersFx = createEffect({ handler: usersApi.getAll })

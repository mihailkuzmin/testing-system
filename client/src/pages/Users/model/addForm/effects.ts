import { createEffect } from 'effector'
import { usersApi } from '../../../../api/users'

export const createUserFx = createEffect({ handler: usersApi.create })

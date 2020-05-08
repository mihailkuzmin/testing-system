import { createEffect } from 'effector'
import { usersApi } from '@api'

export const createUserFx = createEffect({ handler: usersApi.create })

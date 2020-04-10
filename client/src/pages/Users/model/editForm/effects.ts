import { createEffect } from 'effector'
import { usersApi } from '../../../../api'

export const editUserFx = createEffect({ handler: usersApi.update })
export const getUserFx = createEffect({ handler: usersApi.getById })

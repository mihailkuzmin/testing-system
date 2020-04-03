import { createEffect } from 'effector'
import { usersApi, groupsApi } from '../../../../api'

export const getAllUsersFx = createEffect({ handler: usersApi.getAll })
export const getGroupsFx = createEffect({ handler: groupsApi.getAll })

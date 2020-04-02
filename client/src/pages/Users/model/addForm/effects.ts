import { createEffect } from 'effector'
import { usersApi, groupsApi } from '../../../../api'

export const createUserFx = createEffect({ handler: usersApi.create })
export const getAllGroupsFx = createEffect({ handler: groupsApi.getAll })

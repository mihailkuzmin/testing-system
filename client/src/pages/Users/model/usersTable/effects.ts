import { createEffect } from 'effector'
import { usersApi, groupsApi } from '../../../../api'

export const getAllUsersFx = createEffect({ handler: usersApi.getAll })
export const deleteUserFx = createEffect({ handler: usersApi.deleteById })
export const getGroupsFx = createEffect({ handler: groupsApi.getAll })

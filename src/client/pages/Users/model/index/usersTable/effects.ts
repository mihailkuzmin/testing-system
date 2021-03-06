import { createReEffect } from 'effector-reeffect'
import { usersApi, groupsApi } from '@api'

export const getUsersFx = createReEffect({ handler: usersApi.getAll })
export const deleteUserFx = createReEffect({ handler: usersApi.deleteById })
export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })

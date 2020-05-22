import { createReEffect } from 'effector-reeffect'
import { groupsApi, usersApi } from '@api'
import { authApi } from '@api/auth'

export const getUserFx = createReEffect({ handler: usersApi.getById })
export const getRolesFx = createReEffect({ handler: authApi.getRoles })
export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })
export const updateUserFx = createReEffect({ handler: usersApi.update })

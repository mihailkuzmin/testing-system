import { createReEffect } from 'effector-reeffect'
import { authApi } from '@api/auth'
import { groupsApi, usersApi } from '@api'

export const getRolesFx = createReEffect({ handler: authApi.getRoles })
export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })
export const createUserFx = createReEffect({ handler: usersApi.create })

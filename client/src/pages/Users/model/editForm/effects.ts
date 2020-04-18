import { createReEffect } from 'effector-reeffect'
import { usersApi } from '../../../../api'

export const editUserFx = createReEffect({ handler: usersApi.update })
export const getUserFx = createReEffect({ handler: usersApi.getById })

import { createReEffect } from 'effector-reeffect'
import { authApi } from '@api/auth'

export const checkFx = createReEffect({ handler: authApi.check })
export const loginFx = createReEffect({ handler: authApi.login })
export const logoutFx = createReEffect({ handler: authApi.logout })

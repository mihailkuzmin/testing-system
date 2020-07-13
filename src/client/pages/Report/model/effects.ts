import { createReEffect } from 'effector-reeffect'
import { reportApi } from '@api'

export const getWorksFx = createReEffect({ handler: reportApi.getWorks })
export const getUsersFx = createReEffect({ handler: reportApi.getUsers })

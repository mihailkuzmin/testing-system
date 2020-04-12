import { createReEffect } from 'effector-reeffect'
import { groupsApi } from '../../../../api'

export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })

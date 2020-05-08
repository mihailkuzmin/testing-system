import { createReEffect } from 'effector-reeffect'
import { groupsApi } from '@api'

export const editGroupFx = createReEffect({ handler: groupsApi.update })
export const getGroupFx = createReEffect({ handler: groupsApi.getById })

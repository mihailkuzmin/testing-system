import { createEffect } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { groupsApi } from '@api'

export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })
export const deleteGroupFx = createEffect({ handler: groupsApi.deleteById })

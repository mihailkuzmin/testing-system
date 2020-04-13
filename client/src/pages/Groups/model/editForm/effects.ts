import { createEffect } from 'effector'
import { groupsApi } from '../../../../api'

export const editGroupFx = createEffect({ handler: groupsApi.update })
export const getGroupFx = createEffect({ handler: groupsApi.getById })

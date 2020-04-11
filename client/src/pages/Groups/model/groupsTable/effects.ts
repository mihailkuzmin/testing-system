import { createEffect } from 'effector'
import { groupsApi } from '../../../../api'

export const getGroupsFx = createEffect({ handler: groupsApi.getAll })

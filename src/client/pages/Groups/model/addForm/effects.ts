import { createEffect } from 'effector'
import { groupsApi } from '@api'

export const createGroupFx = createEffect({ handler: groupsApi.create })

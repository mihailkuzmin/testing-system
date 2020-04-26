import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '../../../../../api'

export const getTaskFx = createReEffect({ handler: tasksApi.getById })

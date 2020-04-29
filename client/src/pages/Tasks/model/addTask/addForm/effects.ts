import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '../../../../../api'

export const createTaskFx = createReEffect({ handler: tasksApi.create })

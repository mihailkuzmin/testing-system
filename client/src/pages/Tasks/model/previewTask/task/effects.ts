import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '../../../../../api'

export const getTaskPreviewFx = createReEffect({ handler: tasksApi.getPreviewById })

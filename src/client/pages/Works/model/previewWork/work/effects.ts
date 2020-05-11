import { createReEffect } from 'effector-reeffect'
import { worksApi } from '@api'

export const getWorkFx = createReEffect({ handler: worksApi.getById })
export const getTasksOfWorkPreviewsFx = createReEffect({ handler: worksApi.getTasksOfWorkPreviews })

import { createReEffect } from 'effector-reeffect'
import { worksApi } from '@api'

export const getWorkFx = createReEffect({ handler: worksApi.getById })
export const getTasksOfWorkFx = createReEffect({ handler: worksApi.getTasksOfWork })

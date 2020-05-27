import { createReEffect } from 'effector-reeffect'
import { tasksApi, worksApi } from '@api'

export const getTasksFx = createReEffect({ handler: worksApi.getTasksOfWork })
export const getLangsFx = createReEffect({ handler: tasksApi.getPLangs })

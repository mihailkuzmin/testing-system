import { createReEffect } from 'effector-reeffect'
import { tasksApi, worksApi } from '@api'

export const getTasksFx = createReEffect({
  handler: worksApi.getTasksOfWorkWithoutDescriptionAndTests,
})
export const getTaskInfoFx = createReEffect({ handler: tasksApi.getById })

export const getLangsFx = createReEffect({ handler: tasksApi.getPLangs })

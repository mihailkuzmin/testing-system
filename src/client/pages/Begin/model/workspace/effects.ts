import { createReEffect } from 'effector-reeffect'
import { tasksApi, worksApi } from '@api'
import { timeout } from '@common/helpers'

export const getTasksFx = createReEffect({
  handler: worksApi.getTasksOfWorkWithoutDescriptionAndTests,
})
export const getTaskInfoFx = createReEffect({ handler: tasksApi.getById })
export const runFx = createReEffect({ handler: worksApi.submitTask })
export const getLangsFx = createReEffect({ handler: tasksApi.getPLangs })
export const beginWorkFx = createReEffect({ handler: worksApi.beginWork })

export const tickFx = createReEffect({ handler: () => timeout(200) })

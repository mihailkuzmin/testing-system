import { createReEffect } from 'effector-reeffect'
import { tasksApi, worksApi } from '@api'

export const getTasksFx = createReEffect({ handler: tasksApi.getAllWithoutDescriptionAndTests })
export const getWorksWithTaskFx = createReEffect({ handler: worksApi.getWorksWithTask })
export const deleteTaskFx = createReEffect({ handler: tasksApi.deleteById })

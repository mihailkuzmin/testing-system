import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '@api'

export const getTasksFx = createReEffect({ handler: tasksApi.getAllWithoutDescriptionAndTests })
export const deleteTaskFx = createReEffect({ handler: tasksApi.deleteById })

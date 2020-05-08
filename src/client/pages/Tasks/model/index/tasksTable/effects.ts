import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '@api'

export const getTasksFx = createReEffect({ handler: tasksApi.getAll })
export const deleteTaskFx = createReEffect({ handler: tasksApi.deleteById })
export const createTaskFx = createReEffect({ handler: tasksApi.create })

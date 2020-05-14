import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '@api'

export const getTaskFx = createReEffect({ handler: tasksApi.getByIdWithoutTests })
export const updateTaskFx = createReEffect({ handler: tasksApi.update })
export const getTestsFx = createReEffect({ handler: tasksApi.getTestsById })
export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })

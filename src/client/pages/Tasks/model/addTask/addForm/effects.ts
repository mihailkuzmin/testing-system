import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '@api'

export const createTaskFx = createReEffect({ handler: tasksApi.create })
export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })

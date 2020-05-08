import { createReEffect } from 'effector-reeffect'
import { tasksApi } from '@api'

export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })
export const getTasksFx = createReEffect({ handler: tasksApi.getAll })

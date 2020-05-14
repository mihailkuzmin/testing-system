import { createReEffect } from 'effector-reeffect'
import { tasksApi, worksApi } from '@api'

export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })
export const getTasksFx = createReEffect({ handler: tasksApi.getAllWithoutDescriptionAndTests })

export const createWorkFx = createReEffect({ handler: worksApi.create })

import { createReEffect } from 'effector-reeffect'
import { groupsApi, tasksApi, worksApi } from '@api'

export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })
export const getTasksFx = createReEffect({ handler: tasksApi.getAllWithoutDescriptionAndTests })
export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })

export const createWorkFx = createReEffect({ handler: worksApi.create })

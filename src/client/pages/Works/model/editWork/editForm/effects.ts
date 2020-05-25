import { createReEffect } from 'effector-reeffect'
import { groupsApi, tasksApi, worksApi } from '@api'

export const getWorkFx = createReEffect({ handler: worksApi.getById })
export const getAllTasksFx = createReEffect({ handler: tasksApi.getAllWithoutDescriptionAndTests })
export const getTasksOfWorkFx = createReEffect({
  handler: worksApi.getTasksOfWorkWithoutDescriptionAndTests,
})
export const getGroupsOfWorkFx = createReEffect({ handler: worksApi.getGroupsOfWork })
export const getTopicsFx = createReEffect({ handler: tasksApi.getTopics })
export const getGroupsFx = createReEffect({ handler: groupsApi.getAll })

export const updateWorkFx = createReEffect({ handler: worksApi.update })

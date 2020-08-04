import { createReEffect } from 'effector-reeffect'
import { reportApi, tasksApi, usersApi, worksApi } from '@api'

export const getReportFx = createReEffect({ handler: reportApi.getUserReport })

export const getWorkFx = createReEffect({ handler: worksApi.getById })
export const getTasksCountFx = createReEffect({ handler: worksApi.getTasksCount })

export const getTaskFx = createReEffect({ handler: tasksApi.getById })

export const getUserFx = createReEffect({ handler: usersApi.getById })

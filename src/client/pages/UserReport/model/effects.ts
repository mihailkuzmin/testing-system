import { createReEffect } from 'effector-reeffect'
import { reportApi } from '@api'

export const getReportFx = createReEffect({ handler: reportApi.getUserReport })

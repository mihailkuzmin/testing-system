import { createStore } from 'effector'
import { Report } from '@common/typings/report'

export const $report = createStore<Report | null>(null)

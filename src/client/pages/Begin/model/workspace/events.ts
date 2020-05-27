import { createEvent } from 'effector'
import { PLangId, TaskId } from '@common/typings/task'

export const langChanged = createEvent<PLangId>()

export const codeChanged = createEvent<string>()
export const tabChanged = createEvent<number>()

export const taskChanged = createEvent<TaskId>()

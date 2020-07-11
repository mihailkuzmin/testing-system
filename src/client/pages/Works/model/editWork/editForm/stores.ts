import { createStore } from 'effector'
import { Task, Topic } from '@common/typings/task'
import { WorkId } from '@common/typings/work'
import { Group } from '@common/typings/group'
import { setTimeToCompleteDate } from '@common/helpers'

export const $tasks = createStore<Task[]>([])
export const $selectedTasks = createStore<Task[]>([])

export const $topics = createStore<Topic[]>([])
export const $selectedTopic = createStore<Topic | null>(null)

export const $groups = createStore<Group[]>([])
export const $selectedGroups = createStore<Group[]>([])

export const $id = createStore<WorkId | null>(null)
export const $name = createStore('')
export const $openAt = createStore(new Date())
export const $closeAt = createStore(new Date())
export const $timeToComplete = createStore(
  setTimeToCompleteDate({ date: new Date(), hours: 1, minutes: 0 }),
)

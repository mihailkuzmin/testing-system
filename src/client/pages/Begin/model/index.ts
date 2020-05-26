import { combine, createEvent, createStore, forward } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { worksApi } from '@api'
import { WorkId } from '@common/typings/work'
import { Task } from '@common/typings/task'

export const getTasksFx = createReEffect({ handler: worksApi.getTasksOfWork })

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = combine([getTasksFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getTasksFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const BeginPage = { open, close, onMount, $status }

forward({ from: BeginPage.open, to: getTasksFx })

export const $tasks = createStore<Task[]>([])
$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(BeginPage.close)

export const $selectedTask = createStore<Task | null>(null)
$selectedTask.on(getTasksFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0]
  }
})

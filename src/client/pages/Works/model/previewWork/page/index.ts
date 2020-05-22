import { createEvent, createStore, combine, forward } from 'effector'
import { WorkId } from '@common/typings/work'
import { getWorkFx, getTasksOfWorkFx } from '../work/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = combine([getWorkFx.pending, getTasksOfWorkFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getWorkFx.fail, getTasksOfWorkFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const PreviewPage = { open, close, onMount, $status }

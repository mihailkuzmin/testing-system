import { createEvent, createStore, combine } from 'effector'
import { WorkId } from '@common/typings/work'
import { getWorkFx, getTasksOfWorkFx } from '../work/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getWorkFx.done, (state) => state - 1)
$isLoading.on(getTasksOfWorkFx.done, (state) => state - 1)
$isLoading.on(getTasksOfWorkFx.fail, () => 0)
$isLoading.on(getWorkFx.fail, () => 0)

$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getWorkFx.fail, () => true)
$isFail.on(getTasksOfWorkFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading.map(Boolean), isFail: $isFail })

export const PreviewPage = { open, close, onMount, $status }

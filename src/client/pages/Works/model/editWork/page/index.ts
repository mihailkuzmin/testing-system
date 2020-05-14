import { createEvent, createStore, combine } from 'effector'
import { WorkId } from '@common/typings/work'
import { getWorkFx, getTopicsFx, getAllTasksFx, getTasksOfWorkFx } from '../editForm/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(4)
$isLoading.on(getWorkFx.done, (state) => state - 1)
$isLoading.on(getAllTasksFx.done, (state) => state - 1)
$isLoading.on(getTopicsFx.done, (state) => state - 1)
$isLoading.on(getTasksOfWorkFx.done, (state) => state - 1)
$isLoading.on(getWorkFx.fail, () => 0)
$isLoading.on(getAllTasksFx.fail, () => 0)
$isLoading.on(getTopicsFx.fail, () => 0)
$isLoading.on(getTasksOfWorkFx.fail, () => 0)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getWorkFx.fail, () => true)
$isFail.on(getAllTasksFx.fail, () => true)
$isFail.on(getTopicsFx.fail, () => true)
$isFail.on(getTasksOfWorkFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading.map(Boolean), isFail: $isFail })

export const EditPage = { open, close, onMount, $status }

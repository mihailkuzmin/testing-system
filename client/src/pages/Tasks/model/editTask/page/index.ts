import { createEvent, createStore, combine } from 'effector'
import { getTaskFx, getTopicsFx } from '../editForm/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getTaskFx.done, (count) => (count > 0 ? count - 1 : count))
$isLoading.on(getTopicsFx.done, (count) => (count > 0 ? count - 1 : count))
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTaskFx.fail, () => true)
$isFail.on(getTopicsFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail }, (status) => ({
  ...status,
  isLoading: Boolean(status.isLoading),
}))

export const EditPage = { open, close, onMount, $status }

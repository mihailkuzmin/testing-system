import { createEvent, createStore, combine } from 'effector'
import { getTaskFx } from '../task/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getTaskFx.done, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTaskFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const PreviewPage = { open, close, onMount, $status }

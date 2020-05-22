import { createEvent, createStore, combine } from 'effector'
import { getTaskPreviewFx } from '../task/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const $isLoading = getTaskPreviewFx.pending
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTaskPreviewFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const PreviewPage = { open, close, onMount, $status }

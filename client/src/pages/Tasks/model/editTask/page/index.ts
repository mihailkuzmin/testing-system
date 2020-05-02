import { createEvent, createStore, combine } from 'effector'
import { getTaskFx } from '../editForm/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getTaskFx.done, () => false)
$isLoading.on(getTaskFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTaskFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const EditPage = { open, close, onMount, $status }

import { createEvent, createStore, combine } from 'effector'
import { getTasksFx } from '../tasksTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getTasksFx.done, () => false)
$isLoading.on(getTasksFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTasksFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const TasksPage = { open, close, onMount, $status }

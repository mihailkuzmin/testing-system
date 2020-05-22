import { createEvent, createStore, combine } from 'effector'
import { getTasksFx } from '../tasksTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = getTasksFx.pending
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTasksFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const TasksPage = { open, close, onMount, $status }

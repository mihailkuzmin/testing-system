import { combine, createEvent, createStore } from 'effector'
import { getTopicsFx } from '../addForm/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getTopicsFx.done, () => false)
$isLoading.on(getTopicsFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTopicsFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const AddTaskPage = { open, close, onMount, $status }

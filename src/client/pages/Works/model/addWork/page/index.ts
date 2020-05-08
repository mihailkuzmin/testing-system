import { combine, createEvent, createStore } from 'effector'
import { getTopicsFx, getTasksFx } from '../addForm/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getTasksFx.done, (count) => (count > 0 ? count - 1 : count))
$isLoading.on(getTopicsFx.done, (count) => (count > 0 ? count - 1 : count))
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTasksFx.fail, () => true)
$isFail.on(getTopicsFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail }, (status) => ({
  ...status,
  isLoading: Boolean(status.isLoading),
}))

export const AddWorkPage = { open, close, onMount, $status }

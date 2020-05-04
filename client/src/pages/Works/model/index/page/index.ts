import { createEvent, createStore, combine } from 'effector'
import { getWorksFx } from '../worksTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getWorksFx.done, () => false)
$isLoading.on(getWorksFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getWorksFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const WorksPage = { open, close, onMount, $status }

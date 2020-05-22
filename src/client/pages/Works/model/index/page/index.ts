import { createEvent, createStore, combine } from 'effector'
import { getWorksFx } from '../worksTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = getWorksFx.pending

const $isFail = createStore(false)
$isFail.on(getWorksFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const WorksPage = { open, close, onMount, $status }

import { createEvent, createStore, combine } from 'effector'
import { WorkId } from '@common/typings/work'
import { getWorkFx } from '../work/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getWorkFx.done, () => false)
$isLoading.on(getWorkFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getWorkFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const PreviewPage = { open, close, onMount, $status }

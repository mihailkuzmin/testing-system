import { combine, createEvent, createStore, forward } from 'effector'
import { WorkId } from '@common/typings/work'
import { beginWorkFx, getLangsFx, getTasksFx } from '../workspace/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = combine([getTasksFx.pending, getLangsFx.pending, beginWorkFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getTasksFx.fail, getLangsFx.fail, beginWorkFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const BeginPage = { open, close, onMount, $status }

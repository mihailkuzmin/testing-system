import { combine, createEvent, createStore, forward } from 'effector'
import { getTopicsFx, getTasksFx, getGroupsFx } from '../addForm/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = combine(
  [getTasksFx.pending, getTopicsFx.pending, getGroupsFx.pending],
  (arr) => {
    return arr.reduce((prev, next) => prev || next)
  },
)

const setFail = createEvent()
forward({ from: [getTasksFx.fail, getTopicsFx.fail, getGroupsFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const AddWorkPage = { open, close, onMount, $status }

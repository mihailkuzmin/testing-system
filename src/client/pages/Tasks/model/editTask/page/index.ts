import { createEvent, createStore, combine, forward } from 'effector'
import { getTaskFx, getTopicsFx } from '../editForm/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const $isLoading = combine([getTaskFx.pending, getTopicsFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getTaskFx.fail, getTopicsFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const EditPage = { open, close, onMount, $status }

import { createEvent, createStore, combine } from 'effector'
import { getTaskFx, getTopicsFx } from '../editForm/effects'

type TaskId = number

const open = createEvent<TaskId>()
const close = createEvent()

const onMount = (id: number) => {
  open(id)
  return () => close()
}

const effectsLoading = combine(
  getTaskFx.pending,
  getTopicsFx.pending,
  (tasks, topics) => tasks || topics,
)

const $isLoading = createStore(true)
$isLoading.on(effectsLoading, (_, loading) => loading)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getTaskFx.fail, () => true)
$isFail.on(getTopicsFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const EditPage = { open, close, onMount, $status }

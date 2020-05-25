import { createEvent, createStore, combine, forward } from 'effector'
import { WorkId } from '@common/typings/work'
import {
  getWorkFx,
  getTopicsFx,
  getAllTasksFx,
  getTasksOfWorkFx,
  getGroupsFx,
  getGroupsOfWorkFx,
} from '../editForm/effects'

const open = createEvent<WorkId>()
const close = createEvent()

const onMount = (id: WorkId) => {
  open(id)
  return () => close()
}

const $isLoading = combine(
  [
    getWorkFx.pending,
    getAllTasksFx.pending,
    getTopicsFx.pending,
    getTasksOfWorkFx.pending,
    getGroupsFx.pending,
    getGroupsOfWorkFx.pending,
  ],
  (arr) => {
    return arr.reduce((prev, next) => prev || next)
  },
)

const setFail = createEvent()
forward({
  from: [
    getWorkFx.fail,
    getAllTasksFx.fail,
    getTopicsFx.fail,
    getTasksOfWorkFx.fail,
    getGroupsFx.fail,
    getGroupsOfWorkFx.fail,
  ],
  to: setFail,
})
const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const EditPage = { open, close, onMount, $status }

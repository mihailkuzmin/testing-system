import { combine, createStore, forward } from 'effector'
import { getUsersFx, getWorksFx } from './effects'
import { open, close, loadUsers, cancelLoadUsers } from './events'
import { $works, $users, $selectedWork } from './stores'

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

forward({ from: open, to: [getWorksFx] })
forward({ from: close, to: [getWorksFx.cancel, getUsersFx.cancel] })

forward({ from: loadUsers, to: getUsersFx })
forward({ from: cancelLoadUsers, to: getUsersFx.cancel })

$works.on(getWorksFx.doneData, (_, { payload }) => payload)
$works.reset(close)

$selectedWork.on(loadUsers, (_, id) => id)
$selectedWork.reset(cancelLoadUsers)

$users.on(getUsersFx.doneData, (_, { payload }) => payload)
$users.reset(cancelLoadUsers, close)

export const report = {
  page: { onMount, status: combine({ isLoading: $isLoading, isFail: $isFail }) },
  users: { $users, $isLoading: getUsersFx.pending, loadUsers, cancelLoadUsers },
  $works,
  $selectedWork,
}

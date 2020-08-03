import { combine, createStore, forward, guard, sample } from 'effector'
import { getGroupsFx, getUsersFx, getWorksFx } from './effects'
import { open, close, selectWork, selectGroup, unselectWork, unselectGroup } from './events'
import { $works, $users, $selectedWorkId, $groups, $selectedGroupId } from './stores'

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
forward({ from: close, to: [getWorksFx.cancel, getGroupsFx.cancel, getUsersFx.cancel] })

forward({ from: unselectWork, to: [getWorksFx.cancel, getGroupsFx.cancel, getUsersFx.cancel] })
forward({ from: unselectGroup, to: [getGroupsFx.cancel, getUsersFx.cancel] })

$works.on(getWorksFx.doneData, (_, { payload }) => payload)
$works.reset(close)

$selectedWorkId.on(selectWork, (_, id) => id)
$selectedWorkId.reset(close, unselectWork)

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(close, unselectWork)

$selectedGroupId.on(selectGroup, (_, id) => id)
$selectedGroupId.reset(close, unselectWork, unselectGroup)

$users.on(getUsersFx.doneData, (_, { payload }) => payload)
$users.reset(close, unselectWork, unselectGroup)

guard({
  source: $selectedWorkId,
  target: getGroupsFx,
  filter: Boolean,
})

guard({
  source: sample({
    source: [$selectedGroupId, $selectedWorkId],
    clock: $selectedGroupId,
    fn: ([groupId, workId]) => ({ workId, groupId }),
  }),
  target: getUsersFx,
  filter: ({ workId, groupId }) => workId !== null && groupId !== null,
})

export const report = {
  page: { onMount, status: combine({ isLoading: $isLoading, isFail: $isFail }) },
  works: {
    $works: combine({
      works: $works,
      selectedWorkId: $selectedWorkId,
      isLoading: getWorksFx.pending,
    }),
    selectWork,
    unselectWork,
  },
  groups: {
    $groups: combine({
      groups: $groups,
      selectedGroupId: $selectedGroupId,
      isLoading: getGroupsFx.pending,
    }),
    selectGroup,
    unselectGroup,
  },
  users: { $users: combine({ users: $users, isLoading: getUsersFx.pending }) },
}

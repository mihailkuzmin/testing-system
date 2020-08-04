import { combine, createStore, forward, sample } from 'effector'
import { WorkId } from '@common/typings/work'
import { UserId } from '@common/typings/user'
import { GroupId } from '@common/typings/group'
import { getReportFx, getUserFx, getWorkFx, getTasksCountFx, getTaskFx } from './effects'
import { $selectedTask, $selectedTaskId, $tasksCount, $tasksResults, $user, $work } from './stores'
import { open, close, selectTask, unselectTask } from './events'

const onMount = (params: { workId: WorkId; userId: UserId; groupId: GroupId }) => {
  open(params)
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getReportFx.done, (state) => state - 1)
$isLoading.on(getWorkFx.done, (state) => state - 1)
$isLoading.on(getReportFx.fail, () => 0)
$isLoading.on(getWorkFx.fail, () => 0)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getReportFx.fail, () => true)
$isFail.on(getReportFx.fail, () => true)
$isFail.reset(close)

forward({ from: open, to: getReportFx })
forward({ from: open.map(({ workId }) => workId), to: [getWorkFx, getTasksCountFx] })
forward({ from: open.map(({ userId }) => userId), to: getUserFx })
forward({
  from: close,
  to: [
    getReportFx.cancel,
    getWorkFx.cancel,
    getUserFx.cancel,
    getTasksCountFx.cancel,
    getTaskFx.cancel,
  ],
})

forward({ from: [selectTask, unselectTask], to: getTaskFx.cancel })

$tasksResults.on(getReportFx.doneData, (_, { payload }) => payload)
$tasksResults.reset(close)

const $completedTasksCount = $tasksResults.map((tasks) => {
  return tasks.reduce((acc, task) => (task.testsPassed === task.testsCount ? acc + 1 : acc), 0)
})

$selectedTaskId.on(selectTask, (_, id) => id)
$selectedTaskId.reset(close, unselectTask)

sample({
  source: selectTask,
  clock: selectTask,
  target: getTaskFx,
})

$selectedTask.on(getTaskFx.doneData, (_, { payload }) => payload)
$selectedTask.reset(close, unselectTask, getTaskFx)

const $selectedTaskResult = combine(
  { results: $tasksResults, selectedTaskId: $selectedTaskId },
  ({ results, selectedTaskId }) => {
    return results.find((t) => t.id === selectedTaskId)
  },
)

$work.on(getWorkFx.doneData, (_, { payload }) => payload)
$work.reset(close)

$tasksCount.on(getTasksCountFx.doneData, (_, { payload }) => payload)
$tasksCount.reset(close)

$user.on(getUserFx.doneData, (_, { payload }) => payload)
$user.reset(close)

export const userReport = {
  selectTask,
  unselectTask,
  page: { onMount, status: combine({ isLoading: $isLoading.map(Boolean), isFail: $isFail }) },
  $tasks: combine({
    tasksResults: $tasksResults,
    completedTasksCount: $completedTasksCount,
    selectedTaskId: $selectedTaskId,
    selectedTask: $selectedTask,
    selectedTaskResult: $selectedTaskResult,
    taskInfoIsLoading: getTaskFx.pending,
  }),
  $work: combine({ work: $work, tasksCount: $tasksCount }),
  $user,
}

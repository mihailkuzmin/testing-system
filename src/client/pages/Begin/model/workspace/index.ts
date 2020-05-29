import { combine, forward, guard, sample } from 'effector'
import { $user } from '@model/auth/stores'
import { BeginPage } from '../page'
import { getLangsFx, getTaskInfoFx, getTasksFx, runFx } from './effects'
import {
  $code,
  $console,
  $langs,
  $selectedLangId,
  $selectedTab,
  $selectedTaskId,
  $selectedTaskInfo,
  $tasks,
  $workId,
} from './stores'
import { codeChanged, langChanged, submitTask, tabChanged, taskChanged, testTask } from './events'
import { Tabs } from '@pages/Begin/model/workspace/typings'

const selectedTaskChanged = sample({
  source: $tasks,
  clock: taskChanged,
  fn: (tasks, taskId) => {
    const task = tasks.find((task) => task.id === taskId)
    return task!
  },
})
const selectedTaskIdChanged = selectedTaskChanged.map((task) => task.id)

forward({ from: BeginPage.open, to: [getTasksFx, getLangsFx] })
forward({ from: BeginPage.close, to: [getTasksFx.cancel, getLangsFx.cancel, getTaskInfoFx.cancel] })
forward({ from: taskChanged, to: getTaskInfoFx.cancel })
forward({ from: selectedTaskIdChanged, to: getTaskInfoFx })

$workId.on(BeginPage.open, (_, workId) => workId)
$workId.reset(BeginPage.close)

getTasksFx.doneData.watch(({ payload }) => {
  if (payload) {
    getTaskInfoFx(payload[0].id)
  }
})

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(BeginPage.close)

$selectedTaskId.on(getTasksFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0].id
  }
})
$selectedTaskId.on(selectedTaskIdChanged, (_, taskId) => taskId)
$selectedTaskId.reset(BeginPage.close)

$selectedTaskInfo.on(getTaskInfoFx.doneData, (_, { payload }) => payload)
$selectedTaskInfo.reset(BeginPage.close, taskChanged)

$langs.on(getLangsFx.doneData, (_, { payload }) => payload)
$langs.reset(BeginPage.close)

$selectedLangId.on(getLangsFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0].id
  }
})
$selectedLangId.on(langChanged, (_, lang) => lang)
$selectedLangId.reset(BeginPage.close)

$selectedTab.on(tabChanged, (_, tab) => tab)
$selectedTab.on(runFx, () => Tabs.Console)
$selectedTab.reset(BeginPage.close)

$code.on(codeChanged, (_, code) => code)
$code.reset(BeginPage.close)

$console.on(runFx, () => 'Running...')
$console.on(runFx.doneData, (_, { payload }) => payload?.output)
$console.reset(BeginPage.close)

const $forSubmit = combine(
  {
    code: $code,
    plangId: $selectedLangId,
    workId: $workId,
    taskId: $selectedTaskId,
    userId: $user,
  },
  ({ userId, ...task }) => ({ ...task, userId: userId?.id }),
)

const $canSubmit = $forSubmit.map((task) => {
  return Object.values(task)
    .map(Boolean)
    .reduce((prev, next) => prev && next)
})

guard({
  source: sample($forSubmit, testTask),
  filter: $canSubmit,
  target: runFx,
})

export const workspace = {
  $tasks: combine({
    tasks: $tasks,
    selectedId: $selectedTaskId,
    selectedTaskInfo: $selectedTaskInfo,
    taskInfoIsLoading: getTaskInfoFx.pending,
  }),
  $langs: combine({ langs: $langs, selected: $selectedLangId }),
  $codeEditor: combine({
    code: $code,
    console: $console,
    tab: $selectedTab,
    runPending: runFx.pending,
  }),
  langChanged,
  codeChanged,
  taskChanged,
  tabChanged,
  testTask,
  submitTask,
}

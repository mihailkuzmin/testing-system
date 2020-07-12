import { combine, forward, guard, sample } from 'effector'
import { $user } from '@model/auth/stores'
import { CodeTask, Tabs } from '@pages/Begin/model/workspace/typings'
import {
  addToDate,
  getTimeToCompleteString,
  intervalToDuration,
  setTimeToCompleteDate,
} from '@common/helpers'
import { BeginPage } from '../page'
import { getLangsFx, getTaskInfoFx, getTasksFx, runFx, beginWorkFx, tickFx } from './effects'
import {
  $codeTask,
  $execResult,
  $langs,
  $selectedLangId,
  $selectedTab,
  $selectedTaskId,
  $selectedTaskInfo,
  $tasks,
  $workId,
  $startedAt,
  $endAt,
  $timeLeft,
} from './stores'
import {
  codeChanged,
  langChanged,
  submitTask,
  tabChanged,
  taskChanged,
  testTask,
  updateTime,
} from './events'

const selectedTaskChanged = sample({
  source: $tasks,
  clock: taskChanged,
  fn: (tasks, taskId) => {
    const task = tasks.find((task) => task.id === taskId)
    return task!
  },
})
const selectedTaskIdChanged = selectedTaskChanged.map((task) => task.id)

forward({ from: BeginPage.open, to: [getTasksFx, getLangsFx, beginWorkFx, tickFx] })
forward({
  from: BeginPage.close,
  to: [
    getTasksFx.cancel,
    getLangsFx.cancel,
    getTaskInfoFx.cancel,
    beginWorkFx.cancel,
    tickFx.cancel,
  ],
})
forward({ from: taskChanged, to: getTaskInfoFx.cancel })
forward({ from: selectedTaskIdChanged, to: getTaskInfoFx })

$workId.on(BeginPage.open, (_, workId) => workId)
$workId.reset(BeginPage.close)

$startedAt.on(beginWorkFx.doneData, (_, { payload }) => {
  if (payload) {
    return new Date(payload.startedAt)
  }

  return null
})
$startedAt.reset(BeginPage.close)

$endAt.on(beginWorkFx.doneData, (_, { payload }) => {
  if (payload) {
    const startedAt = new Date(payload.startedAt)
    const timeToComplete = new Date(payload.timeToComplete)
    return addToDate(startedAt, {
      hours: timeToComplete.getHours(),
      minutes: timeToComplete.getMinutes(),
    })
  }
})
$endAt.reset(BeginPage.close)

const $time = combine({ startedAt: $startedAt, endAt: $endAt })

$time.watch(tickFx.done, ({ startedAt, endAt }) => {
  if (startedAt === null || endAt === null) {
    return updateTime('')
  }

  if (endAt < new Date()) {
    return updateTime('Время вышло')
  }

  const duration = intervalToDuration({
    start: new Date(),
    end: endAt,
  })

  return updateTime(`${duration.hours}ч. ${duration.minutes}мин. ${duration.seconds}сек.`)
})

$timeLeft.on(updateTime, (_, time) => time)
$timeLeft.reset(BeginPage.close)

updateTime.watch(tickFx)

getTasksFx.doneData.watch(({ payload }) => {
  if (payload) {
    getTaskInfoFx(payload[0].id)
  }
})

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(BeginPage.close)

$codeTask.on(getTasksFx.doneData, (_, { payload }) => {
  if (payload) {
    const res: CodeTask = {}

    payload.forEach((t) => (res[t.id] = ''))

    return res
  }
})

const taskCodeChanged = sample({
  source: $selectedTaskId,
  clock: codeChanged,
  fn: (taskId, code) => ({ taskId, code }),
})

$codeTask.on(taskCodeChanged, (codeTask, { taskId, code }) => {
  return { ...codeTask, [taskId as number]: code }
})
$codeTask.reset(BeginPage.close)

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

const $selectedLang = combine({ langs: $langs, langId: $selectedLangId }, ({ langs, langId }) => {
  return langs.find((lang) => lang.id === langId) ?? null
})

$selectedTab.on(tabChanged, (_, tab) => tab)
$selectedTab.on(runFx, () => Tabs.Console)
$selectedTab.on(taskChanged, () => Tabs.Editor)
$selectedTab.reset(BeginPage.close)

const $code = combine(
  { selectedTaskId: $selectedTaskId, codeTask: $codeTask },
  ({ selectedTaskId, codeTask }) => {
    if (selectedTaskId) {
      return codeTask[selectedTaskId]
    }

    return ''
  },
)

$execResult.on(runFx, () => [{ ok: true, runtimeError: false, output: 'Выполнение...' }])
$execResult.on(runFx.doneData, (_, { payload }) => payload)
$execResult.on(runFx.failData, () => [{ ok: false, runtimeError: false, output: 'Ошибка сервера' }])
$execResult.reset(BeginPage.close, taskChanged)

const $testsPassed = $execResult.map((results) => {
  return results.reduce((sum, result) => sum + Number(result.ok), 0)
})

const $forSubmit = combine(
  {
    code: $code,
    plang: $selectedLang,
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
  $timeLeft,
  $tasks: combine({
    tasks: $tasks,
    selectedId: $selectedTaskId,
    selectedTaskInfo: $selectedTaskInfo,
    taskInfoIsLoading: getTaskInfoFx.pending,
  }),
  $langs: combine({ langs: $langs, selected: $selectedLangId }),
  $codeEditor: combine({
    code: $code,
    execResult: $execResult,
    testsPassed: $testsPassed,
    tab: $selectedTab,
    runPending: runFx.pending,
    canRun: $canSubmit,
  }),
  langChanged,
  codeChanged,
  taskChanged,
  tabChanged,
  testTask,
  submitTask,
}

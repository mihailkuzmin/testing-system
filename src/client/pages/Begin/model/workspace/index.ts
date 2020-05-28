import { combine, forward, sample } from 'effector'
import { BeginPage } from '../page'
import { getTasksFx, getLangsFx, getTaskInfoFx } from './effects'
import {
  $tasks,
  $selectedTaskId,
  $selectedTaskInfo,
  $langs,
  $selectedLangId,
  $code,
  $console,
  $selectedTab,
} from './stores'
import { langChanged, codeChanged, taskChanged, tabChanged } from './events'

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

$selectedLangId.on(langChanged, (_, lang) => lang)
$selectedLangId.reset(BeginPage.close)

$selectedTab.on(tabChanged, (_, tab) => tab)
$selectedTab.reset(BeginPage.close)

$code.on(codeChanged, (_, code) => code)
$code.reset(BeginPage.close)

$console.reset(BeginPage.close)

export const workspace = {
  $tasks: combine({
    tasks: $tasks,
    selectedId: $selectedTaskId,
    selectedTaskInfo: $selectedTaskInfo,
    taskInfoIsLoading: getTaskInfoFx.pending,
  }),
  $langs: combine({ langs: $langs, selected: $selectedLangId }),
  $codeEditor: combine({ code: $code, console: $console, tab: $selectedTab }),
  langChanged,
  codeChanged,
  taskChanged,
  tabChanged,
}

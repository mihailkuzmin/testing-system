import { combine, forward, sample } from 'effector'
import { BeginPage } from '../page'
import { getTasksFx, getLangsFx } from './effects'
import { $selectedTask, $tasks, $langs, $selectedLangId, $code } from './stores'
import { langChanged, codeChanged, taskChanged } from './events'

forward({ from: BeginPage.open, to: [getTasksFx, getLangsFx] })
forward({ from: BeginPage.close, to: [getTasksFx.cancel, getLangsFx.cancel] })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(BeginPage.close)

sample({
  source: $tasks,
  clock: taskChanged,
  target: $selectedTask,
  fn: (tasks, taskId) => tasks.find((task) => task.id === taskId) ?? null,
})

$selectedTask.on(getTasksFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0]
  }
})
$selectedTask.reset(BeginPage.close)

$langs.on(getLangsFx.doneData, (_, { payload }) => payload)
$langs.reset(BeginPage.close)

$selectedLangId.on(langChanged, (_, lang) => lang)
$selectedLangId.reset(BeginPage.close)

$code.on(codeChanged, (_, code) => code)
$code.reset(BeginPage.close)

export const workspace = {
  $tasks: combine({ tasks: $tasks, selected: $selectedTask }),
  $langs: combine({ langs: $langs, selected: $selectedLangId }),
  $code,
  langChanged,
  codeChanged,
  taskChanged,
}

import { forward } from 'effector'
import { $task } from './stores'
import { getTaskFx } from './effects'
import { PreviewPage } from '../page'

forward({ from: PreviewPage.open, to: getTaskFx })
forward({ from: PreviewPage.close, to: getTaskFx.cancel })

$task.on(getTaskFx.doneData, (_, { payload }) => payload)
$task.reset(PreviewPage.close)

export const task = {
  $task,
}

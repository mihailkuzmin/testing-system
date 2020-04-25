import { forward } from 'effector'
import { $task } from './stores'
import { getTaskFx } from './effects'
import { PreviewPage } from '../page'

forward({ from: PreviewPage.open, to: getTaskFx })

$task.on(getTaskFx.doneData, (_, { payload }) => payload)
$task.reset(PreviewPage.close)

export const task = {
  $task,
}

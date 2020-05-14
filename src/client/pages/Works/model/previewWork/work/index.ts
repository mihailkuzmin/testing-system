import { forward } from 'effector'
import { PreviewPage } from '../page'
import { $preview, $tasks } from './stores'
import { getWorkFx, getTasksOfWorkFx } from './effects'

forward({ from: PreviewPage.open, to: [getWorkFx, getTasksOfWorkFx] })
forward({ from: PreviewPage.close, to: [getWorkFx.cancel, getTasksOfWorkFx.cancel] })

$preview.on(getWorkFx.doneData, (_, { payload }) => payload)
$preview.reset(PreviewPage.close)

$tasks.on(getTasksOfWorkFx.doneData, (_, { payload }) => payload)
$tasks.reset(PreviewPage.close)

export const workPreview = { $preview, $tasks }

import { forward } from 'effector'
import { PreviewPage } from '../page'
import { $preview, $tasks } from './stores'
import { getWorkFx, getTasksOfWorkPreviewsFx } from './effects'

forward({ from: PreviewPage.open, to: [getWorkFx, getTasksOfWorkPreviewsFx] })
forward({ from: PreviewPage.close, to: [getWorkFx.cancel, getTasksOfWorkPreviewsFx.cancel] })

$preview.on(getWorkFx.doneData, (_, { payload }) => payload)
$preview.reset(PreviewPage.close)

$tasks.on(getTasksOfWorkPreviewsFx.doneData, (_, { payload }) => payload)
$tasks.reset(PreviewPage.close)

export const workPreview = { $preview, $tasks }

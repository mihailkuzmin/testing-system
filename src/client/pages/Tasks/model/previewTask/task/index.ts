import { forward } from 'effector'
import { PreviewPage } from '../page'
import { $taskPreview } from './stores'
import { getTaskPreviewFx } from './effects'

forward({ from: PreviewPage.open, to: getTaskPreviewFx })
forward({ from: PreviewPage.close, to: getTaskPreviewFx.cancel })

$taskPreview.on(getTaskPreviewFx.doneData, (_, { payload }) => payload)
$taskPreview.reset(PreviewPage.close)

export const taskPreview = { $taskPreview }

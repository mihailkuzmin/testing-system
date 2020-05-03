import { forward } from 'effector'
import { $taskPreview } from './stores'
import { getTaskPreviewFx } from './effects'
import { PreviewPage } from '../page'

forward({ from: PreviewPage.open, to: getTaskPreviewFx })
forward({ from: PreviewPage.close, to: getTaskPreviewFx.cancel })

$taskPreview.on(getTaskPreviewFx.doneData, (_, { payload }) => payload)
$taskPreview.reset(PreviewPage.close)

export const taskPreview = {
  $taskPreview,
}

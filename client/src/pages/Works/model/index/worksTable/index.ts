import { forward, sample } from 'effector'
import { $deleteDialogIsOpen, $selectedForDelete, $works } from './stores'
import { deleteWorkFx, getWorksFx } from './effects'
import { WorksPage } from '../page'
import { cancelDelete, confirmDelete, selectForDelete } from './events'
import { notifications } from '../../../../../model/notifications'
import { MessageType } from '../../../../../typings'

forward({ from: WorksPage.open, to: getWorksFx })
forward({ from: WorksPage.close, to: getWorksFx.cancel })
forward({ from: deleteWorkFx.done, to: getWorksFx })

$works.on(getWorksFx.doneData, (_, { payload }) => {
  return payload.map(({ openAt, closeAt, ...work }) => ({
    ...work,
    openAt: new Date(openAt).toLocaleString(),
    closeAt: new Date(closeAt).toLocaleString(),
  }))
})
$works.reset(WorksPage.close)

sample({
  source: $works,
  clock: selectForDelete,
  target: $selectedForDelete,
  fn: (works, workId) => works.find((work) => work.id === workId) ?? null,
})
$selectedForDelete.reset(WorksPage.close, deleteWorkFx, cancelDelete)

sample({
  source: $selectedForDelete,
  clock: confirmDelete,
  target: deleteWorkFx,
  fn: (work) => work!.id,
})

deleteWorkFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

deleteWorkFx.doneData.watch(() => {
  notifications.createMessage({ text: 'Выполнено', type: MessageType.Success })
})

export const worksTable = {
  $works,
  $deleteDialogIsOpen,
  $selectedForDelete,
  selectForDelete,
  confirmDelete,
  cancelDelete,
}

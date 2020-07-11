import { forward, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { getTimeToCompleteString } from '@common/helpers'
import { WorksPage } from '../page'
import { $deleteDialogIsOpen, $selectedForDelete, $works } from './stores'
import { deleteWorkFx, getWorksFx } from './effects'
import { cancelDelete, confirmDelete, selectForDelete } from './events'

forward({ from: WorksPage.open, to: getWorksFx })
forward({ from: WorksPage.close, to: getWorksFx.cancel })
forward({ from: deleteWorkFx.done, to: getWorksFx })

$works.on(getWorksFx.doneData, (_, { payload }) => {
  return payload!.map(({ openAt, closeAt, timeToComplete, ...work }) => ({
    ...work,
    openAt: new Date(openAt).toLocaleString(),
    closeAt: new Date(closeAt).toLocaleString(),
    timeToComplete: getTimeToCompleteString(new Date(timeToComplete)),
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

deleteWorkFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

export const worksTable = {
  $works,
  $deleteDialogIsOpen,
  $selectedForDelete,
  selectForDelete,
  confirmDelete,
  cancelDelete,
}

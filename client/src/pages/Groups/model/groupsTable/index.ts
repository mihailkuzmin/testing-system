import { forward, sample } from 'effector'
import { $groups, $getGroupsStatus, $selectedForDelete } from './stores'
import { getGroupsFx, deleteGroupFx } from './effects'
import {
  selectForDelete,
  confirmDelete,
  cancelDelete,
  groupDeleted,
} from './events'
import { GroupsPage } from '../page'
import { addForm } from '../addForm'
import { deleteModal } from '../deleteModal'
import { notifications } from '../../../../model'
import { Status, MessageType } from '../.././../../typings'

forward({ from: [GroupsPage.open, addForm.groupCreated], to: getGroupsFx })
forward({ from: addForm.groupCreated, to: getGroupsFx })
forward({ from: GroupsPage.close, to: getGroupsFx.cancel })
forward({ from: deleteGroupFx.doneData, to: groupDeleted })
forward({ from: groupDeleted, to: getGroupsFx })

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(GroupsPage.close)

forward({ from: selectForDelete, to: deleteModal.openDeleteModal })
forward({
  from: [confirmDelete, cancelDelete],
  to: deleteModal.closeDeleteModal,
})

sample({
  source: $groups,
  clock: selectForDelete,
  target: $selectedForDelete,
  fn: (groups, groupId) => groups.find((group) => group.id === groupId) || null,
})
$selectedForDelete.reset(cancelDelete, groupDeleted)
$selectedForDelete.watch(confirmDelete, (group) => {
  if (group !== null) {
    deleteGroupFx(group.id)
    notifications.createMessage({
      type: MessageType.Info,
      text: `Удаление группы ${group.name}`,
    })
  }
})

$getGroupsStatus.on(getGroupsFx.done, () => Status.Idle)
$getGroupsStatus.on(getGroupsFx.fail, () => Status.Fail)
$getGroupsStatus.reset(GroupsPage.close)

deleteGroupFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

deleteGroupFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

export const groupsTable = {
  $groups,
  $getGroupsStatus,
  $selectedForDelete,
  selectForDelete,
  confirmDelete,
  cancelDelete,
}

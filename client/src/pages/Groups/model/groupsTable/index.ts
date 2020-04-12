import { forward, sample } from 'effector'
import { $groups, $getGroupsStatus, $selectedForDelete } from './stores'
import { getGroupsFx } from './effects'
import {
  selectForDelete,
  confirmDelete,
  cancelDelete,
  groupDeleted,
} from './events'
import { GroupsPage } from '../page'
import { addForm } from '../addForm'
import { deleteModal } from '../deleteModal'
import { Status } from '../.././../../typings'

forward({ from: [GroupsPage.open, addForm.groupCreated], to: getGroupsFx })
forward({ from: addForm.groupCreated, to: getGroupsFx })
forward({ from: GroupsPage.close, to: getGroupsFx.cancel })

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
  console.log(`delete: ${group?.name}`)
})

$getGroupsStatus.on(getGroupsFx.done, () => Status.Idle)
$getGroupsStatus.on(getGroupsFx.fail, () => Status.Fail)
$getGroupsStatus.reset(GroupsPage.close)

export const groupsTable = {
  $groups,
  $getGroupsStatus,
  $selectedForDelete,
  selectForDelete,
  confirmDelete,
  cancelDelete,
}

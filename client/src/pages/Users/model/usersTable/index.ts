import { forward, sample, combine } from 'effector'
import {
  $users,
  $getAllUsersStatus,
  $groups,
  $groupSelectValue,
  $groupSelectMinWidth,
  $getGroupsStatus,
  $selectedForDelete,
} from './stores'
import {
  onGroupSelectChange,
  groupSelectChange,
  usersRefreshed,
  groupsRefreshed,
  selectForDelete,
  selectForEdit,
  confirmDelete,
  cancelDelete,
  userDeleted,
} from './events'
import { getAllUsersFx, getGroupsFx, deleteUserFx } from './effects'
import { userCreated } from '../addForm/events'
import { Status, MessageType } from '../../../../typings'
import { notifications } from '../../../../model'
import { deleteModal } from '../deleteModal'
import { UsersPage } from '../page'

forward({ from: UsersPage.open, to: [getAllUsersFx, getGroupsFx] })
forward({ from: userCreated, to: getAllUsersFx })

// bind effects to events
forward({ from: getAllUsersFx.doneData, to: usersRefreshed })
forward({ from: getGroupsFx.doneData, to: groupsRefreshed })
forward({ from: deleteUserFx.doneData, to: userDeleted })
forward({ from: userDeleted, to: getAllUsersFx })

$users.on(usersRefreshed, (_, { payload }) => payload)
$users.reset(UsersPage.close)

$groups.on(groupsRefreshed, (_, { payload }) => payload)
$groups.reset(UsersPage.close)

// when groups list was loaded - select the first group in list
$groupSelectValue.on(groupsRefreshed, (_, { payload }) => {
  const [first] = payload
  return first.id
})
$groupSelectValue.on(groupSelectChange, (_, value) => value)
$groupSelectValue.reset(UsersPage.close)

// when select change - update filter
// trigger update of a table when new user added
const $groupFilter = sample({
  source: $groups,
  clock: $groupSelectValue,
  fn: (groups, selectedId) => {
    return groups.find(({ id }) => id === selectedId) || null
  },
})
$groupFilter.on(usersRefreshed, (state) => (state ? { ...state } : null))
$groupFilter.reset(UsersPage.close)

// when group filter change - filter users store by group name
const $filteredUsers = sample({
  source: $users,
  clock: $groupFilter,
  fn: (users, group) => users.filter((user) => user.group.id === group?.id),
})
$filteredUsers.reset(UsersPage.close)

// bind confirm/cancel to modal open/close events
forward({ from: selectForDelete, to: deleteModal.openDeleteModal })
forward({
  from: [confirmDelete, cancelDelete],
  to: deleteModal.closeDeleteModal,
})

$selectedForDelete.on(selectForDelete, (_, user) => user)
$selectedForDelete.reset(cancelDelete)
$selectedForDelete.watch(confirmDelete, (user) => {
  if (user !== null) {
    deleteUserFx(user.id)
    notifications.createMessage({
      type: MessageType.Info,
      text: `Удаление пользователя ${user.lastName} ${user.firstName} ${user.patronymic}`,
    })
  }
})

$getAllUsersStatus.on(getAllUsersFx.done, () => Status.Idle)
$getAllUsersStatus.on(getAllUsersFx.fail, () => Status.Fail)
$getAllUsersStatus.reset(UsersPage.close)

$getGroupsStatus.on(getGroupsFx.done, () => Status.Idle)
$getGroupsStatus.on(getGroupsFx.fail, () => Status.Fail)
$getGroupsStatus.reset(UsersPage.close)

deleteUserFx.doneData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Success, text: message })
})

deleteUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

getAllUsersFx.failData.watch(({ message }) => {
  notifications.createMessage({ type: MessageType.Error, text: message })
})

const $usersTable = combine({ usersList: $filteredUsers, groupsList: $groups })
const $groupSelect = combine({
  value: $groupSelectValue,
  minWidth: $groupSelectMinWidth,
})
const $status = combine({
  tableStatus: $getAllUsersStatus,
  selectStatus: $getGroupsStatus,
})

export const usersTable = {
  $usersTable,
  $groupSelect,
  $status,
  $selectedForDelete,
  onGroupSelectChange,
  selectForDelete,
  selectForEdit,
  confirmDelete,
  cancelDelete,
}

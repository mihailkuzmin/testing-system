import { forward, sample, combine } from 'effector'
import {
  $users,
  $getAllUsersStatus,
  $groups,
  $groupSelectValue,
  $groupSelectMinWidth,
  $getGroupsStatus,
} from './stores'
import {
  onGroupSelectChange,
  groupSelectChange,
  usersRefreshed,
  groupsRefreshed,
} from './events'
import { getAllUsersFx, getGroupsFx } from './effects'
import { userCreated } from '../addForm/events'
import { Status } from '../../../../typings'
import { UsersPage } from '../page'

forward({ from: UsersPage.open, to: [getAllUsersFx, getGroupsFx] })
forward({ from: userCreated, to: getAllUsersFx })
forward({ from: getAllUsersFx.doneData, to: usersRefreshed })
forward({ from: getGroupsFx.doneData, to: groupsRefreshed })

$users.on(usersRefreshed, (_, { payload }) => payload)
$users.reset(UsersPage.close)

$groups.on(groupsRefreshed, (_, { payload }) => payload)
$groups.reset(UsersPage.close)

$groupSelectValue.on(groupsRefreshed, (_, { payload }) => {
  const [first] = payload
  return first.id
})
$groupSelectValue.on(groupSelectChange, (_, value) => value)
$groupSelectValue.reset(UsersPage.close)

const $groupFilter = sample({
  source: $groups,
  clock: $groupSelectValue,
  fn: (groups, selectedId) => {
    return groups.find(({ id }) => id === selectedId) || null
  },
})
$groupFilter.on(usersRefreshed, (state, _) => (state ? { ...state } : null))
$groupFilter.reset(UsersPage.close)

const $filteredUsers = sample({
  source: $users,
  clock: $groupFilter,
  fn: (users, group) => users.filter((user) => user.group === group?.name),
})
$filteredUsers.reset(UsersPage.close)

$getAllUsersStatus.on(getAllUsersFx.done, (_, __) => Status.Idle)
$getAllUsersStatus.on(getAllUsersFx.fail, (_, __) => Status.Fail)
$getAllUsersStatus.reset(UsersPage.close)

$getGroupsStatus.on(getGroupsFx.done, (_, __) => Status.Idle)
$getGroupsStatus.on(getGroupsFx.fail, (_, __) => Status.Fail)
$getGroupsStatus.reset(UsersPage.close)

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
  onGroupSelectChange,
}

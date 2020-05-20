import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { IndexPage } from '../page'
import {
  $deleteDialogIsOpen,
  $groups,
  $selectedForDelete,
  $selectedGroupId,
  $users,
} from './stores'
import { cancelDelete, confirmDelete, groupChanged, selectForDelete } from './events'
import { deleteUserFx, getGroupsFx, getUsersFx } from './effects'

forward({ from: IndexPage.open, to: [getUsersFx, getGroupsFx] })
forward({ from: IndexPage.close, to: [getUsersFx.cancel, getGroupsFx.cancel] })
forward({ from: deleteUserFx.done, to: getUsersFx })

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(IndexPage.close)

$selectedGroupId.on(getGroupsFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0].id
  }
})
$selectedGroupId.on(groupChanged, (_, groupId) => groupId)
$selectedGroupId.reset(IndexPage.close)

$users.on(getUsersFx.doneData, (_, { payload }) => payload)
$users.reset(IndexPage.close)

const $filteredUsers = combine(
  { users: $users, groupId: $selectedGroupId },
  ({ users, groupId }) => {
    return users.filter((user) => user.group.id === groupId)
  },
)
const $filteredUsersAreEmpty = $filteredUsers.map((users) => !users.length)

const selectedUser = sample({
  source: $filteredUsers,
  clock: selectForDelete,
  fn: (users, userId) => users.find((user) => user.id === userId) ?? null,
})
$selectedForDelete.on(selectedUser, (_, user) => user)
$selectedForDelete.reset(IndexPage.close, cancelDelete, deleteUserFx)

guard({
  source: sample({
    source: $selectedForDelete,
    clock: confirmDelete,
    fn: (user) => (user ? user.id : null),
  }),
  filter: Boolean,
  target: deleteUserFx,
})

deleteUserFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

deleteUserFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

deleteUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

export const usersTable = {
  $filteredUsers,
  $filteredUsersAreEmpty,
  $selectedGroupId,
  $selectedForDelete,
  $deleteDialogIsOpen,
  $groups,
  groupChanged,
  selectForDelete,
  confirmDelete,
  cancelDelete,
}

import { forward } from 'effector'
import { $users, $getAllUsersStatus } from './stores'
import { getAllUsersFx } from './effects'
import { Status } from '../../../../typings'
import { UsersPage } from '../page'
import { userCreated } from '../addForm/events'

forward({ from: UsersPage.open, to: getAllUsersFx })
forward({ from: userCreated, to: getAllUsersFx })

$users.on(getAllUsersFx.doneData, (_, { payload }) => payload)
$users.reset(UsersPage.close)

$getAllUsersStatus.on(getAllUsersFx.done, (_, __) => Status.Idle)
$getAllUsersStatus.on(getAllUsersFx.fail, (_, __) => Status.Fail)
$getAllUsersStatus.reset(UsersPage.close)

export const usersTable = {
  $users,
  $getAllUsersStatus,
}

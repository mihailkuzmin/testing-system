import { $users } from './stores'
import { getAllUsersFx } from './effects'
import { getAllUsers } from './events'
import { forward } from 'effector'

forward({ from: getAllUsers, to: getAllUsersFx })

$users.on(getAllUsersFx.doneData, (_, { payload }) => payload)

export const usersTable = {
  $users,
  getAllUsers,
}

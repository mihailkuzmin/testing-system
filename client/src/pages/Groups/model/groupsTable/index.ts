import { forward } from 'effector'
import { $groups } from './stores'
import { getGroupsFx } from './effects'
import { GroupsPage } from '../page'

forward({ from: GroupsPage.open, to: getGroupsFx })

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(GroupsPage.close)

export const groupsTable = {
  $groups,
}

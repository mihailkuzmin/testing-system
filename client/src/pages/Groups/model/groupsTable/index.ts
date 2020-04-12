import { forward } from 'effector'
import { $groups, $getGroupsStatus } from './stores'
import { getGroupsFx } from './effects'
import { GroupsPage } from '../page'
import { addForm } from '../addForm'
import { Status } from '../.././../../typings'

forward({ from: [GroupsPage.open, addForm.groupCreated], to: getGroupsFx })
forward({ from: addForm.groupCreated, to: getGroupsFx })

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(GroupsPage.close)

$getGroupsStatus.on(getGroupsFx.done, () => Status.Idle)
$getGroupsStatus.on(getGroupsFx.fail, () => Status.Fail)
$getGroupsStatus.reset(GroupsPage.close)

export const groupsTable = {
  $groups,
  $getGroupsStatus,
}

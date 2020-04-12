import { forward } from 'effector'
import { $groups } from './stores'
import { getGroupsFx } from './effects'
import { GroupsPage } from '../page'
import {addForm} from '../addForm'

forward({ from: [GroupsPage.open, addForm.groupCreated], to: getGroupsFx })
forward({from: addForm.groupCreated, to: getGroupsFx})

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(GroupsPage.close)

export const groupsTable = {
  $groups,
}

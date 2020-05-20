import React from 'react'
import { useStore } from 'effector-react'
import { Select, Item } from '@components/Inputs/Select'
import { usersTable } from '@pages/Users/model/index'
import { groupChanged } from '@pages/Users/model/index/usersTable/events'
import { GroupId } from '@common/typings/group'

export const GroupSelect = () => {
  const value = useStore(usersTable.$selectedGroupId)
  const groups = useStore(usersTable.$groups)

  return (
    <Select
      value={value}
      label='Группа'
      variant='standard'
      onChange={(e) => usersTable.groupChanged(e.target.value as GroupId)}
    >
      {groups.map((group) => (
        <Item key={group.id} value={group.id}>
          {group.name}
        </Item>
      ))}
    </Select>
  )
}

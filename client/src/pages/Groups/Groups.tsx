import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { GroupsTable } from './GroupsTable'
import { Layout } from '../../components'
import { groupsTable, GroupsPage } from './model'

export const Groups = (props: IPageProps) => {
  React.useEffect(GroupsPage.onMount, [])

  const groups = useStore(groupsTable.$groups)

  return (
    <Layout>
      <GroupsTable groups={groups} />
    </Layout>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps, Status } from '../../typings'
import { Layout } from '../../components'
import { FullScreenLoader, FullScreenError } from '../../components/Loaders'
import { GroupsTable } from './GroupsTable'
import { groupsTable, GroupsPage } from './model'

export const Groups = (props: IPageProps) => {
  React.useEffect(GroupsPage.onMount, [])
  const groups = useStore(groupsTable.$groups)
  const groupsStatus = useStore(groupsTable.$getGroupsStatus)

  const isLoading = groupsStatus === Status.Pending
  const isFail = groupsStatus === Status.Fail

  if (isLoading) {
    return <FullScreenLoader />
  }

  if (isFail) {
    return <FullScreenError />
  }
  return (
    <Layout>
      <GroupsTable groups={groups} />
    </Layout>
  )
}

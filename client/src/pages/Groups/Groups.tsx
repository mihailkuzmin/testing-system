import React from 'react'
import { useStore } from 'effector-react'
import { PageProps, Status } from '../../typings'
import { PageLoader, PageError } from '../../components/Loaders'
import { GroupsTable } from './GroupsTable'
import { groupsTable, GroupsPage } from './model'

export const Groups = (props: PageProps) => {
  React.useEffect(GroupsPage.onMount, [])
  const groups = useStore(groupsTable.$groups)
  const groupsStatus = useStore(groupsTable.$getGroupsStatus)

  const isLoading = groupsStatus === Status.Pending
  const isFail = groupsStatus === Status.Fail

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }
  return <GroupsTable groups={groups} />
}

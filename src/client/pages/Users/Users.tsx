import React from 'react'
import { useStore } from 'effector-react'
import { PageProps, Status } from '@typings'
import { PageLoader, PageError } from '@components/Loaders'
import { usersTable, UsersPage } from './model'
import { UsersTable } from './UsersTable'

export const Users = (props: PageProps) => {
  React.useEffect(UsersPage.onMount, [])

  const { usersList, groupsList } = useStore(usersTable.$usersTable)
  const { tableStatus, selectStatus } = useStore(usersTable.$status)

  const isLoading = [tableStatus, selectStatus].includes(Status.Pending)
  const isFail = [tableStatus, selectStatus].includes(Status.Fail)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return <UsersTable groups={groupsList} users={usersList} />
}

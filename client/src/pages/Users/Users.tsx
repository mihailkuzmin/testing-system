import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps, Status } from '../../typings'
import { FullScreenLoader, FullScreenError } from '../../components/Loaders'
import { Layout } from '../../components'
import { usersTable, UsersPage } from './model'
import { UsersTable } from './UsersTable'

export const Users = (props: IPageProps) => {
  React.useEffect(UsersPage.onMount, [])

  const { usersList, groupsList } = useStore(usersTable.$usersTable)
  const { tableStatus, selectStatus } = useStore(usersTable.$status)

  const isLoading = [tableStatus, selectStatus].includes(Status.Pending)
  const isFail = [tableStatus, selectStatus].includes(Status.Fail)

  if (isLoading) {
    return <FullScreenLoader />
  }

  if (isFail) {
    return <FullScreenError />
  }

  return (
    <Layout>
      <UsersTable groups={groupsList} users={usersList} />
    </Layout>
  )
}

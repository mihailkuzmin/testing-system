import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps, Status } from '../../typings'
import { Layout, FullScreenError } from '../../components'
import { FullScreenLoader } from '../../components/Loaders'
import { UsersTable } from './UsersTable'
import { addModal, usersTable, UsersPage } from './model'

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
      <UsersTable
        groups={groupsList}
        users={usersList}
        onAddClick={addModal.openAddModal}
      />
    </Layout>
  )
}

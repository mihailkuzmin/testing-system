import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps, Status } from '../../typings'
import { Layout, Modal, FullScreenError } from '../../components'
import { FullScreenLoader } from '../../components/Loaders'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { addModal, usersTable, UsersPage } from './model'

export const Users = (props: IPageProps) => {
  React.useEffect(UsersPage.onMount, [])

  const { usersList, groupsList } = useStore(usersTable.$usersTable)
  const { tableStatus, selectStatus } = useStore(usersTable.$status)
  const modal = useStore(addModal.$addModal)

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
      <Modal open={modal.open} onClose={addModal.closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable
        groups={groupsList}
        users={usersList}
        onAddClick={addModal.openAddModal}
      />
    </Layout>
  )
}

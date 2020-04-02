import React from 'react'
import { useStore, useGate } from 'effector-react'
import { IPageProps, Status } from '../../typings'
import { Layout, Modal, FullScreenError } from '../../components'
import { FullScreenLoader } from '../../components/Loaders'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { addModal, usersTable, UsersPage } from './model'

export const Users = (props: IPageProps) => {
  useGate(UsersPage)
  const usersList = useStore(usersTable.$users)
  const getAllUsersStatus = useStore(usersTable.$getAllUsersStatus)
  const modal = useStore(addModal.$addModal)

  if (getAllUsersStatus === Status.Pending) {
    return <FullScreenLoader />
  }

  if (getAllUsersStatus === Status.Fail) {
    return <FullScreenError />
  }

  return (
    <Layout>
      <Modal open={modal.open} onClose={addModal.closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable users={usersList} onAddClick={addModal.openAddModal} />
    </Layout>
  )
}

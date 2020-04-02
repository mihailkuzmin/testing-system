import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout, Modal } from '../../components'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { addModal, usersTable } from './model'

export const Users = (props: IPageProps) => {
  React.useEffect(() => usersTable.getAllUsers(), [])
  const usersList = useStore(usersTable.$users)
  const { open } = useStore(addModal.$addModal)

  return (
    <Layout>
      <Modal open={open} onClose={addModal.closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable users={usersList} onAddClick={addModal.openAddModal} />
    </Layout>
  )
}

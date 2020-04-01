import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout, Modal } from '../../components'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { users } from './model'

export const Users = (props: IPageProps) => {
  const usersList = useStore(users.$users)
  const addModal = useStore(users.$addModal)

  return (
    <Layout>
      <Modal open={addModal.open} onClose={users.closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable users={usersList} onAddClick={users.openAddModal} />
    </Layout>
  )
}

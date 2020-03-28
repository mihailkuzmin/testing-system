import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout, Modal } from '../../components'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { $page, openAddModal, closeAddModal } from './model'

export const Users = (props: IPageProps) => {
  const [users, addModal] = useStore($page)

  return (
    <Layout>
      <Modal open={addModal.open} onClose={closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable users={users} onAddClick={openAddModal} />
    </Layout>
  )
}

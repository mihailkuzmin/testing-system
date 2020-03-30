import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout, Modal } from '../../components'
import { UsersTable } from './UsersTable'
import { AddUser } from './AddUser'
import { stores, events } from './model'

export const Users = (props: IPageProps) => {
  const users = useStore(stores.$users)
  const addModal = useStore(stores.$addModal)

  return (
    <Layout>
      <Modal open={addModal.open} onClose={events.closeAddModal}>
        <AddUser />
      </Modal>
      <UsersTable users={users} onAddClick={events.openAddModal} />
    </Layout>
  )
}

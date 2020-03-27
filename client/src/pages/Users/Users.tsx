import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout } from '../../components'
import { UsersTable } from './UsersTable'
import { AddModal } from './AddModal'
import { AddForm } from './AddForm'
import { $page, openAddModal, closeAddModal } from './model'

export const Users = (props: IPageProps) => {
  const [users, addModal] = useStore($page)

  return (
    <Layout>
      <AddModal open={addModal.open} handleClose={closeAddModal}>
        <AddForm />
      </AddModal>
      <UsersTable users={users} onAddClick={openAddModal} />
    </Layout>
  )
}

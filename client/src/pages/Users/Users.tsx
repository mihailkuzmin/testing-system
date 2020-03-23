import React from 'react'
import {useStore} from 'effector-react'
import {$model, openAddModal, closeAddModal} from './model'
import { IPageProps } from '../../typings'
import { Layout } from '../../components'
import { UsersTable } from './UsersTable'
import { AddModal } from './AddModal'

export const Users = (props: IPageProps) => {
  const [users, addModal] = useStore($model)

  return (
    <Layout>
      <AddModal open={addModal.open} handleClose={closeAddModal} />
      <UsersTable users={users} onAddClick={openAddModal} />
    </Layout>
  )
}

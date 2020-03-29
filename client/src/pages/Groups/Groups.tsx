import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { GroupsTable } from './GroupsTable'
import { Layout, Modal } from '../../components'
import { AddGroup } from './AddGroup'
import { $page, openAddModal, closeAddModal } from './model'

export const Groups = (props: IPageProps) => {
  const [groups, addModal] = useStore($page)

  return (
    <Layout>
      <Modal open={addModal.open} onClose={closeAddModal}>
        <AddGroup />
      </Modal>
      <GroupsTable groups={groups} onAddClick={openAddModal} />
    </Layout>
  )
}

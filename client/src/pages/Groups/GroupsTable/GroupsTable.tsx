import React from 'react'
import * as T from '../../../components/Table'
import { useStore } from 'effector-react'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '../../../components/Buttons'
import { Modal } from '../../../components'
import { AddGroup } from './AddGroup'
import { EditGroup } from './EditGroup'
import { DeleteGroup } from './DeleteGroup'
import { addModal, editModal, deleteModal, groupsTable } from '../model'
import { Group } from '../model/typings'
import styles from './GroupsTable.module.css'

interface IGroupsTableProps {
  groups?: Group[]
}

export const GroupsTable = ({ groups }: IGroupsTableProps) => {
  const addGroupModal = useStore(addModal.$addModal)
  const editGroupModal = useStore(editModal.$editModal)
  const deleteGroupModal = useStore(deleteModal.$deleteModal)

  return (
    <T.Table className={styles.table}>
      <Modal open={addGroupModal.open} onClose={addModal.closeAddModal}>
        <AddGroup />
      </Modal>
      <Modal open={editGroupModal.open} onClose={editModal.closeEditModal}>
        <EditGroup />
      </Modal>
      <Modal open={deleteGroupModal.open} onClose={deleteModal.closeDeleteModal}>
        <DeleteGroup />
      </Modal>
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={3}>
            <T.Header>
              <T.Title>Группы</T.Title>
              <T.Actions>
                <Add onClick={addModal.openAddModal}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>id</T.Cell>
          <T.Cell>Название</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {groups?.map((group) => {
          return (
            <T.Row key={group.id} className={styles.row}>
              <T.Cell>{group.id}</T.Cell>
              <T.Cell>{group.name}</T.Cell>
              <T.Cell>
                <div className={styles.rowActions}>
                  <Edit onClick={() => groupsTable.selectForEdit(group.id)} />
                  <Delete onClick={() => groupsTable.selectForDelete(group.id)} />
                </div>
              </T.Cell>
            </T.Row>
          )
        })}
      </T.Body>
    </T.Table>
  )
}

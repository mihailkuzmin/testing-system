import React from 'react'
import { useStore } from 'effector-react'
import * as T from '@components/Table'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '@components/Buttons'
import { Modal } from '@components'
import { Group } from '@common/typings/group'
import { addModal, editModal, groupsTable } from '../model'
import { AddGroup } from './AddGroup'
import { EditGroup } from './EditGroup'
import { DeleteGroup } from './DeleteGroup'
import styles from './GroupsTable.module.css'

type GroupsTableProps = { groups?: Group[] }

export const GroupsTable = ({ groups }: GroupsTableProps) => {
  const addGroupModal = useStore(addModal.$addModal)
  const editGroupModal = useStore(editModal.$editModal)

  const groupsIsEmpty = groups?.length === 0

  return (
    <T.Table className={styles.table}>
      <Modal open={addGroupModal.open} onClose={addModal.closeAddModal}>
        <AddGroup />
      </Modal>
      <Modal open={editGroupModal.open} onClose={editModal.closeEditModal}>
        <EditGroup />
      </Modal>
      <DeleteGroup />
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={3}>
            <T.Header>
              <T.Title>Группы</T.Title>
              <T.Actions>
                <Add onClick={() => addModal.openAddModal()}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>№</T.Cell>
          <T.Cell>Название</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {groupsIsEmpty ? (
          <T.Row>
            <T.Cell colSpan={3}>Список групп пока пуст</T.Cell>
          </T.Row>
        ) : (
          groups?.map((group, index) => (
            <T.Row key={group.id} className={styles.row}>
              <T.Cell>{index + 1}</T.Cell>
              <T.Cell>{group.name}</T.Cell>
              <T.Cell>
                <div className={styles.rowActions}>
                  <Edit onClick={() => groupsTable.selectForEdit(group.id)} />
                  <Delete onClick={() => groupsTable.selectForDelete(group.id)} />
                </div>
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

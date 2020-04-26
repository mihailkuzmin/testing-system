import React from 'react'
import { useStore } from 'effector-react'
import { Modal } from '../../../components'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '../../../components/Buttons'
import { UsersTableRow, UsersTableGroup } from '../../../typings'
import * as T from '../../../components/Table'
import { GroupSelect, Item } from './GroupSelect'
import { AddUser } from './AddUser'
import { DeleteUser } from './DeleteUser'
import { EditUser } from './EditUser'
import { usersTable, addModal, deleteModal, editModal } from '../model'
import styles from './UsersTable.module.css'

interface IUsersTableProps {
  users?: UsersTableRow[]
  groups?: UsersTableGroup[]
}

export const UsersTable = ({ users, groups }: IUsersTableProps) => {
  const select = useStore(usersTable.$groupSelect)
  const addUserModal = useStore(addModal.$addModal)
  const deleteUserModal = useStore(deleteModal.$deleteModal)
  const editUserModal = useStore(editModal.$editModal)
  const selectedForDelete = useStore(usersTable.$selectedForDelete)

  const usersAreEmpty = users?.length === 0
  const groupsAreEmpty = groups?.length === 0

  return (
    <T.Table className={styles.table}>
      <Modal open={addUserModal.open} onClose={addModal.closeAddModal}>
        <AddUser groups={groups} />
      </Modal>
      <Modal open={deleteUserModal.open} onClose={deleteModal.closeDeleteModal}>
        <DeleteUser user={selectedForDelete} />
      </Modal>
      <Modal open={editUserModal.open} onClose={editModal.closeEditModal}>
        <EditUser groups={groups} />
      </Modal>
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={6}>
            <T.Header>
              <T.Title>Пользователи</T.Title>
              <T.Actions>
                <Add onClick={addModal.openAddModal}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>№</T.Cell>
          <T.Cell>ФИО</T.Cell>
          <T.Cell>
            <GroupSelect
              minWidth={select.minWidth}
              label='Группа'
              name='table-group'
              value={groupsAreEmpty ? 'Группа' : select.value}
              onChange={usersTable.onGroupSelectChange}
            >
              {groupsAreEmpty ? (
                <Item value='Группа'>Группа</Item>
              ) : (
                groups?.map((group) => (
                  <Item key={group.id} value={group.id}>
                    {group.name}
                  </Item>
                ))
              )}
            </GroupSelect>
          </T.Cell>
          <T.Cell>Зачетная книжка</T.Cell>
          <T.Cell>Логин</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {usersAreEmpty ? (
          <T.Row className={styles.row}>
            <T.Cell colSpan={6}>В этой группе ещё нет людей</T.Cell>
          </T.Row>
        ) : (
          users?.map((user, index) => (
            <T.Row key={user.id} className={styles.row}>
              <T.Cell>{index + 1}</T.Cell>
              <T.Cell>{`${user.lastName} ${user.firstName} ${user.patronymic}`}</T.Cell>
              <T.Cell>{user.group.name}</T.Cell>
              <T.Cell>{user.bookNumber}</T.Cell>
              <T.Cell>{user.login}</T.Cell>
              <T.Cell>
                <div className={styles.rowActions}>
                  <Edit onClick={() => usersTable.selectForEdit(user.id)} />
                  <Delete onClick={() => usersTable.selectForDelete(user.id)} />
                </div>
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

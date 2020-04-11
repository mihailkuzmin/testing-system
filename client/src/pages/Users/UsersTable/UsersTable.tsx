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

  const usersEmpty = users?.length === 0

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
          <T.Cell colSpan={5}>
            <T.Header>
              <T.Title>Пользователи</T.Title>
              <T.Actions>
                <Add onClick={addModal.openAddModal}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>ФИО</T.Cell>
          <T.Cell>
            <GroupSelect
              minWidth={select.minWidth}
              label='Группа'
              name='table-group'
              value={select.value}
              onChange={usersTable.onGroupSelectChange}
            >
              {groups?.map(({ id, name }) => (
                <Item key={id} value={id}>
                  {name}
                </Item>
              ))}
            </GroupSelect>
          </T.Cell>
          <T.Cell>Зачетная книжка</T.Cell>
          <T.Cell>Логин</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {usersEmpty ? (
          <T.Row className={styles.row}>
            <T.Cell>В этой группе ещё нет людей</T.Cell>
            <T.Cell colSpan={4}></T.Cell>
          </T.Row>
        ) : (
          users?.map((user) => {
            return (
              <T.Row key={user.id} className={styles.row}>
                <T.Cell>{`${user.lastName} ${user.firstName} ${user.patronymic}`}</T.Cell>
                <T.Cell>{user.group.name}</T.Cell>
                <T.Cell>{user.bookNumber}</T.Cell>
                <T.Cell>{user.login}</T.Cell>
                <T.Cell>
                  <div className={styles.rowActions}>
                    <Edit onClick={() => usersTable.selectForEdit(user.id)} />
                    <Delete onClick={() => usersTable.selectForDelete(user)} />
                  </div>
                </T.Cell>
              </T.Row>
            )
          })
        )}
      </T.Body>
    </T.Table>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { navigate } from 'hookrouter'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '@components/Buttons'
import * as T from '@components/Table'
import { usersTable } from '@pages/Users/model/index'
import { DeleteUser } from './DeleteUser'
import { GroupSelect } from './GroupSelect'
import styles from './UsersTable.module.css'

export const UsersTable = () => {
  const users = useStore(usersTable.$filteredUsers)
  const isEmpty = useStore(usersTable.$filteredUsersAreEmpty)

  return (
    <T.Table className={styles.table}>
      <DeleteUser />
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={6}>
            <T.Header>
              <T.Title>Пользователи</T.Title>
              <T.Actions>
                <Add onClick={() => navigate(`/users/add`)}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>№</T.Cell>
          <T.Cell>ФИО</T.Cell>
          <T.Cell>
            <GroupSelect />
          </T.Cell>
          <T.Cell>Зачетная книжка</T.Cell>
          <T.Cell>Логин</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {isEmpty ? (
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
                  <Edit onClick={() => navigate(`/users/edit/${user.id}`)} />
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

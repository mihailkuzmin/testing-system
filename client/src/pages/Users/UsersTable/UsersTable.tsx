import React from 'react'
import { useStore } from 'effector-react'
import {
  TableCell as Cell,
  TableHead as Head,
  TableRow as Row,
  TableBody as Body,
} from '@material-ui/core'
import {
  TableTitle,
  TableHeader,
  TableHeaderActions,
  Modal,
} from '../../../components'
import {
  PrimaryButton,
  EditButton,
  DeleteButton,
} from '../../../components/Buttons'
import { UsersTableRow, UsersTableGroup } from '../../../typings'
import { Table } from '../../../components/Table'
import { GroupSelect, Item } from './GroupSelect'
import { AddUser } from './AddUser'
import { DeleteUser } from './DeleteUser'
import { usersTable, addModal } from '../model'
import styles from './UsersTable.module.css'

interface IUsersTableProps {
  users?: UsersTableRow[]
  groups?: UsersTableGroup[]
  onAddClick: any
}

export const UsersTable = ({ users, groups, onAddClick }: IUsersTableProps) => {
  const { value, minWidth } = useStore(usersTable.$groupSelect)
  const addUserModal = useStore(addModal.$addModal)
  const deleteUserModal = useStore(usersTable.$deleteUserModal)

  const usersEmpty = users?.length === 0

  return (
    <Table className={styles.table}>
      <Modal open={addUserModal.open} onClose={addModal.closeAddModal}>
        <AddUser groups={groups} />
      </Modal>
      <Modal open={deleteUserModal.open} onClose={usersTable.cancelDelete}>
        <DeleteUser user={deleteUserModal.user} />
      </Modal>
      <Head className={styles.head}>
        <Row>
          <Cell colSpan={5}>
            <TableHeader>
              <TableTitle>Пользователи</TableTitle>
              <TableHeaderActions>
                <PrimaryButton onClick={onAddClick}>Добавить</PrimaryButton>
              </TableHeaderActions>
            </TableHeader>
          </Cell>
        </Row>
        <Row>
          <Cell>ФИО</Cell>
          <Cell>
            <GroupSelect
              minWidth={minWidth}
              label='Группа'
              name='table-group'
              value={value}
              onChange={usersTable.onGroupSelectChange}
            >
              {groups?.map(({ id, name }) => (
                <Item key={id} value={id}>
                  {name}
                </Item>
              ))}
            </GroupSelect>
          </Cell>
          <Cell>Номер зачетной книжки</Cell>
          <Cell>Логин</Cell>
          <Cell>Действия</Cell>
        </Row>
      </Head>
      <Body>
        {usersEmpty ? (
          <Row className={styles.row}>
            <Cell>В этой группе ещё нет людей</Cell>
            <Cell colSpan={4}></Cell>
          </Row>
        ) : (
          users?.map((user) => {
            return (
              <Row key={user.id} className={styles.row}>
                <Cell>{`${user.lastName} ${user.firstName} ${user.patronymic}`}</Cell>
                <Cell>{user.group}</Cell>
                <Cell>{user.bookNumber}</Cell>
                <Cell>{user.login}</Cell>
                <Cell>
                  <div className={styles.rowActions}>
                    <EditButton />
                    <DeleteButton
                      onClick={() => usersTable.selectForDelete(user)}
                    />
                  </div>
                </Cell>
              </Row>
            )
          })
        )}
      </Body>
    </Table>
  )
}

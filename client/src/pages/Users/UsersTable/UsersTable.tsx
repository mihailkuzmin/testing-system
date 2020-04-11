import React from 'react'
import { useStore } from 'effector-react'
import { Modal } from '../../../components'
import {
  PrimaryButton,
  EditButton,
  DeleteButton,
} from '../../../components/Buttons'
import { UsersTableRow, UsersTableGroup } from '../../../typings'
import {
  Table,
  Title,
  Header,
  Actions,
  Cell,
  Row,
  Head,
  Body
} from '../../../components/Table'
import { GroupSelect, Item } from './GroupSelect'
import { AddUser } from './AddUser'
import { DeleteUser } from './DeleteUser'
import { EditUser } from './EditUser'
import { usersTable, addModal, deleteModal, editModal } from '../model'
import styles from './UsersTable.module.css'

interface IUsersTableProps {
  users?: UsersTableRow[]
  groups?: UsersTableGroup[]
  onAddClick: any
}

export const UsersTable = ({ users, groups, onAddClick }: IUsersTableProps) => {
  const select = useStore(usersTable.$groupSelect)
  const addUserModal = useStore(addModal.$addModal)
  const deleteUserModal = useStore(deleteModal.$deleteModal)
  const editUserModal = useStore(editModal.$editModal)
  const selectedForDelete = useStore(usersTable.$selectedForDelete)

  const usersEmpty = users?.length === 0

  return (
    <Table className={styles.table}>
      <Modal open={addUserModal.open} onClose={addModal.closeAddModal}>
        <AddUser groups={groups} />
      </Modal>
      <Modal open={deleteUserModal.open} onClose={deleteModal.closeDeleteModal}>
        <DeleteUser user={selectedForDelete} />
      </Modal>
      <Modal open={editUserModal.open} onClose={editModal.closeEditModal}>
        <EditUser groups={groups} />
      </Modal>
      <Head className={styles.head}>
        <Row>
          <Cell colSpan={5}>
            <Header>
              <Title>Пользователи</Title>
              <Actions>
                <PrimaryButton onClick={onAddClick}>Добавить</PrimaryButton>
              </Actions>
            </Header>
          </Cell>
        </Row>
        <Row>
          <Cell>ФИО</Cell>
          <Cell>
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
          </Cell>
          <Cell>Зачетная книжка</Cell>
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
                <Cell>{user.group.name}</Cell>
                <Cell>{user.bookNumber}</Cell>
                <Cell>{user.login}</Cell>
                <Cell>
                  <div className={styles.rowActions}>
                    <EditButton
                      onClick={() => usersTable.selectForEdit(user.id)}
                    />
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

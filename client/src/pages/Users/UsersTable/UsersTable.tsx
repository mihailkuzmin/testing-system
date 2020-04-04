import React from 'react'
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
} from '../../../components'
import {
  PrimaryButton,
  EditButton,
  DeleteButton,
} from '../../../components/Buttons'
import { Table } from '../../../components/Table'
import { GroupSelect, Item } from './GroupSelect'
import { UsersTableRow, UsersTableGroup } from '../../../typings'
import styles from './UsersTable.module.css'
import { useStore } from 'effector-react'
import { usersTable } from '../model'

interface IUsersTableProps {
  users?: UsersTableRow[]
  groups?: UsersTableGroup[]
  onAddClick: any
}

export const UsersTable = ({ users, groups, onAddClick }: IUsersTableProps) => {
  const { value, minWidth } = useStore(usersTable.$groupSelect)
  const usersEmpty = users?.length === 0

  return (
    <Table className={styles.table}>
      <Head className={styles.head}>
        <Row>
          <Cell colSpan={4}>
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
          <Cell>Логин</Cell>
          <Cell>Действия</Cell>
        </Row>
      </Head>
      <Body>
        {usersEmpty ? (
          <Row className={styles.row}>
            <Cell colSpan={4}>В этой группе ещё нет людей</Cell>
          </Row>
        ) : (
          users?.map(({ id, name, group, login }) => {
            return (
              <Row key={id} className={styles.row}>
                <Cell>{name}</Cell>
                <Cell>{group}</Cell>
                <Cell>{login}</Cell>
                <Cell>
                  <div className={styles.rowActions}>
                    <EditButton />
                    <DeleteButton
                      onClick={() => usersTable.deleteUser({ id, name })}
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

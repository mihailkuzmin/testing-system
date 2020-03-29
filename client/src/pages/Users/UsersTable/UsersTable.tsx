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
import { User } from '../model/typings'
import styles from './UsersTable.module.css'

interface IUsersTableProps {
  users?: User[]
  onAddClick: any
}

export const UsersTable = ({ users, onAddClick }: IUsersTableProps) => {
  return (
    <Table>
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
          <Cell>Группа</Cell>
          <Cell>Логин</Cell>
          <Cell>Действия</Cell>
        </Row>
      </Head>
      <Body>
        {users?.map(({ id, name, group, login }) => {
          return (
            <Row key={id} className={styles.row}>
              <Cell>{name}</Cell>
              <Cell>{group}</Cell>
              <Cell>{login}</Cell>
              <Cell>
                <div className={styles.rowActions}>
                  <EditButton />
                  <DeleteButton />
                </div>
              </Cell>
            </Row>
          )
        })}
      </Body>
    </Table>
  )
}

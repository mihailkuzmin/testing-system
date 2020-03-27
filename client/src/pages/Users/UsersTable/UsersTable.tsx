import React from 'react'
import {
  TableCell as Cell,
  TableHead as Head,
  TableRow as Row,
  Table,
  TableBody as Body,
  Paper,
} from '@material-ui/core'
import {
  TableRowActions,
  TableTitle,
  TableHeader,
  TableHeaderActions,
  PrimaryButton,
  EditButton,
  DeleteButton,
} from '../../../components'
import styles from './UsersTable.module.css'

import { User } from '../model/typings'

// TODO remove 'any'
interface IUsersTableProps {
  users?: User[]
  onAddClick: any
}

export const UsersTable = ({ users, onAddClick }: IUsersTableProps) => {
  return (
    <Paper className={styles.table} elevation={5}>
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
            <Cell align='right'>Группа</Cell>
            <Cell align='right'>Логин</Cell>
            <Cell align='center'>Действия</Cell>
          </Row>
        </Head>
        <Body>
          {users &&
            users.map(({ id, name, group, login }) => {
              return (
                <Row key={id} className={styles.row}>
                  <Cell>{name}</Cell>
                  <Cell align='right'>{group}</Cell>
                  <Cell align='right'>{login}</Cell>
                  <Cell align='center'>
                    <TableRowActions>
                      <EditButton />
                      <DeleteButton />
                    </TableRowActions>
                  </Cell>
                </Row>
              )
            })}
        </Body>
      </Table>
    </Paper>
  )
}

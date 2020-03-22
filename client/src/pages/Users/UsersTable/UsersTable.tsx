import React, { useState } from 'react'
import {
  TableCell as Cell,
  TableHead as Head,
  TableRow as Row,
  Table,
  TableBody as Body,
  Paper,
} from '@material-ui/core'
import { AddModal } from '../AddModal'
import { PrimaryButton, EditButton, DeleteButton } from '../../../components/Buttons'
import { TableRowActions, TableTitle, TableHeader, TableHeaderActions } from '../../../components'
import styles from './UsersTable.module.css'

// TODO remove 'any'
interface IUsersTableProps {
  users?: any[]
}

export const UsersTable = (props: IUsersTableProps) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const handleOpenAddUser = () => setAddUserOpen(true)
  const handleCloseAddUser = () => setAddUserOpen(false)

  const users = [
    { name: 'Исаков Клим Ярославович', group: 'АП-31', login: 'login1' },
    { name: 'Владосов Арнольд Артемович', group: 'АП-31', login: 'login2' },
    { name: 'Виноградов Владислав Георгьевич', group: 'АП-21', login: 'login3' },
    { name: 'Муравьёв Аристарх Романович', group: 'МР-191', login: 'login4' },
  ]

  return (
    <Paper className={styles.table} elevation={5}>
      <AddModal open={addUserOpen} handleClose={handleCloseAddUser} />
      <Table>
        <Head className={styles.head}>
          <Row>
            <Cell colSpan={4}>
              <TableHeader>
                <TableTitle>Пользователи</TableTitle>
                <TableHeaderActions>
                  <PrimaryButton onClick={handleOpenAddUser}>Добавить</PrimaryButton>
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
          {users.map(({ name, group, login }) => {
            return (
              <Row key={name} className={styles.row}>
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

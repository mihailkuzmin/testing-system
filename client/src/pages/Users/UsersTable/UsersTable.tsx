import React, { useState } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Paper,
  Button
} from '@material-ui/core'
import styles from './UsersTable.module.css'

// TODO remove 'any'
interface IUsersTableProps {
  users?: any[]
}

export const UsersTable = (props: IUsersTableProps) => {
  return (
    <Paper className={styles.table} elevation={3}>
    <TableContainer>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell colSpan={3}>
              <div className={styles.headRow}>
              <div className={styles.title}>
                Пользователи
              </div>
              <div>
              <Button variant='outlined' color='primary'>Добавить</Button>
              </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align='right'>Группа</TableCell>
            <TableCell align='right'>Логин</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={styles.row}>
            <TableCell>Исаков Клим Ярославович</TableCell>
            <TableCell align='right'>АП-31</TableCell>
            <TableCell align='right'>login1</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Владосов Арнольд Артемович</TableCell>
            <TableCell align='right'>АП-31</TableCell>
            <TableCell align='right'>login2</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Виноградов Владислав Георгьевич</TableCell>
            <TableCell align='right'>АП-21</TableCell>
            <TableCell align='right'>login3</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Муравьёв Аристарх Романович</TableCell>
            <TableCell align='right'>МР-191</TableCell>
            <TableCell align='right'>login4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  )
}

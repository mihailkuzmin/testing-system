import React from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Paper,
} from '@material-ui/core'
import styles from './UsersTable.module.css'

// TODO remove 'any'
interface IUsersTableProps {
  users?: any[]
}

export const UsersTable = (props: IUsersTableProps) => {
  return (
    <TableContainer className={styles.table} component={Paper}>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell>Пользователь</TableCell>
            <TableCell>Группа</TableCell>
            <TableCell>Логин</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={styles.row}>
            <TableCell>Исаков Клим Ярославович</TableCell>
            <TableCell>АП-31</TableCell>
            <TableCell>login1</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Мясников Арнольд Артемович</TableCell>
            <TableCell>АП-31</TableCell>
            <TableCell>login2</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Виноградов Владислав Георгьевич</TableCell>
            <TableCell>АП-21</TableCell>
            <TableCell>login3</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>Муравьёв Аристарх Романович</TableCell>
            <TableCell>МР-191</TableCell>
            <TableCell>login4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

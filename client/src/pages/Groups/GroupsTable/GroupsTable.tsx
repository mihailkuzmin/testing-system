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
import styles from './GroupsTable.module.css'

// TODO remove 'any'
interface IGroupsTableProps {
  groups?: any[]
}

export const GroupsTable = (props: IGroupsTableProps) => {
  return (
    <TableContainer className={styles.table} component={Paper}>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell>Группа</TableCell>
            <TableCell>Название</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={styles.row}>
            <TableCell>1</TableCell>
            <TableCell>АП-31</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>2</TableCell>
            <TableCell>УС-31</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>3</TableCell>
            <TableCell>АП-21</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>4</TableCell>
            <TableCell>МР-191</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
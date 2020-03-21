import React, { useState } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Paper,
  Button,
} from '@material-ui/core'
import {AddModal} from '../AddModal'
import styles from './GroupsTable.module.css'

// TODO remove 'any'
interface IGroupsTableProps {
  groups?: any[]
}

export const GroupsTable = (props: IGroupsTableProps) => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const handleOpenAddGroup = () => setAddGroupOpen(true)
  const handleCloseAddGroup = () => setAddGroupOpen(false)

  return (
    <Paper className={styles.table} elevation={3}>
    <AddModal open={addGroupOpen} handleClose={handleCloseAddGroup} onClose={handleCloseAddGroup} />
    <TableContainer>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell colSpan={3}>
              <div className={styles.headRow}>
                <div className={styles.title}>Группы</div>
                <div>
                  <Button onClick={handleOpenAddGroup} variant='outlined' color='primary'>
                    Добавить
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align='right'>Название</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={styles.row}>
            <TableCell>1</TableCell>
            <TableCell align='right'>АП-31</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>2</TableCell>
            <TableCell align='right'>УС-31</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>3</TableCell>
            <TableCell align='right'>АП-21</TableCell>
          </TableRow>
          <TableRow className={styles.row}>
            <TableCell>4</TableCell>
            <TableCell align='right'>МР-191</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  )
}

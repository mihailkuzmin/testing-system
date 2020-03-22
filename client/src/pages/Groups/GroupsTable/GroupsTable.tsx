import React, { useState } from 'react'
import {
  TableCell as Cell,
  TableHead as Head,
  TableRow as Row,
  Table,
  TableBody as Body,
  Paper,
} from '@material-ui/core'
import { PrimaryButton, EditButton, DeleteButton } from '../../../components/Buttons'
import { RowActions } from '../../../components'
import { AddModal } from '../AddModal'
import styles from './GroupsTable.module.css'

// TODO remove 'any'
interface IGroupsTableProps {
  groups?: any[]
}

export const GroupsTable = (props: IGroupsTableProps) => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const handleOpenAddGroup = () => setAddGroupOpen(true)
  const handleCloseAddGroup = () => setAddGroupOpen(false)

  const groups = [
    { id: 1, name: 'АП-31' },
    { id: 2, name: 'УС-31' },
    { id: 3, name: 'АП-21' },
    { id: 4, name: 'МР-11' },
  ]

  return (
    <Paper className={styles.table} elevation={5}>
      <AddModal open={addGroupOpen} handleClose={handleCloseAddGroup} />
      <Table>
        <Head className={styles.head}>
          <Row>
            <Cell colSpan={3}>
              <div className={styles.headRow}>
                <div className={styles.title}>Группы</div>
                <div>
                  <PrimaryButton onClick={handleOpenAddGroup}>Добавить</PrimaryButton>
                </div>
              </div>
            </Cell>
          </Row>
          <Row>
            <Cell>id</Cell>
            <Cell align='right'>Название</Cell>
            <Cell align='center'>Действия</Cell>
          </Row>
        </Head>
        <Body>
          {groups.map(({ id, name }) => {
            return (
              <Row key={id} className={styles.row}>
                <Cell>{id}</Cell>
                <Cell align='right'>{name}</Cell>
                <Cell align='center'>
                  <RowActions>
                    <EditButton />
                    <DeleteButton />
                  </RowActions>
                </Cell>
              </Row>
            )
          })}
        </Body>
      </Table>
    </Paper>
  )
}

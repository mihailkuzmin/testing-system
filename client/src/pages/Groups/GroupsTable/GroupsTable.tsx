import React, { useState } from 'react'
import {
  TableCell as Cell,
  TableHead as Head,
  TableRow as Row,
  Table,
  TableBody as Body,
  Paper,
} from '@material-ui/core'
import { PrimaryButton } from '../../../components/Buttons'
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

  return (
    <Paper className={styles.table} elevation={3}>
      <AddModal
        open={addGroupOpen}
        handleClose={handleCloseAddGroup}
        onClose={handleCloseAddGroup}
      />
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
          </Row>
        </Head>
        <Body>
          <Row className={styles.row}>
            <Cell>1</Cell>
            <Cell align='right'>АП-31</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>2</Cell>
            <Cell align='right'>УС-31</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>3</Cell>
            <Cell align='right'>АП-21</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>4</Cell>
            <Cell align='right'>МР-191</Cell>
          </Row>
        </Body>
      </Table>
    </Paper>
  )
}

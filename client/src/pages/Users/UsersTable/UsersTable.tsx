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
import { PrimaryButton } from '../../../components/Buttons'
import styles from './UsersTable.module.css'

// TODO remove 'any'
interface IUsersTableProps {
  users?: any[]
}

export const UsersTable = (props: IUsersTableProps) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const handleOpenAddUser = () => setAddUserOpen(true)
  const handleCloseAddUser = () => setAddUserOpen(false)

  return (
    <Paper className={styles.table} elevation={3}>
      <AddModal open={addUserOpen} handleClose={handleCloseAddUser} onClose={handleCloseAddUser} />
      <Table>
        <Head className={styles.head}>
          <Row>
            <Cell colSpan={3}>
              <div className={styles.headRow}>
                <div className={styles.title}>Пользователи</div>
                <div className={styles.actions}>
                  <PrimaryButton onClick={handleOpenAddUser}>Добавить</PrimaryButton>
                </div>
              </div>
            </Cell>
          </Row>
          <Row>
            <Cell>ФИО</Cell>
            <Cell align='right'>Группа</Cell>
            <Cell align='right'>Логин</Cell>
          </Row>
        </Head>
        <Body>
          <Row className={styles.row}>
            <Cell>Исаков Клим Ярославович</Cell>
            <Cell align='right'>АП-31</Cell>
            <Cell align='right'>login1</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>Владосов Арнольд Артемович</Cell>
            <Cell align='right'>АП-31</Cell>
            <Cell align='right'>login2</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>Виноградов Владислав Георгьевич</Cell>
            <Cell align='right'>АП-21</Cell>
            <Cell align='right'>login3</Cell>
          </Row>
          <Row className={styles.row}>
            <Cell>Муравьёв Аристарх Романович</Cell>
            <Cell align='right'>МР-191</Cell>
            <Cell align='right'>login4</Cell>
          </Row>
        </Body>
      </Table>
    </Paper>
  )
}

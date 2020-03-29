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
import { Table } from '../../../components/Table'
import {
  PrimaryButton,
  EditButton,
  DeleteButton,
} from '../../../components/Buttons'
import { Group } from '../model/typings'
import styles from './GroupsTable.module.css'

interface IGroupsTableProps {
  groups?: Group[]
  onAddClick: any
}

export const GroupsTable = ({ groups, onAddClick }: IGroupsTableProps) => {
  return (
    <Table>
      <Head className={styles.head}>
        <Row>
          <Cell colSpan={3}>
            <TableHeader>
              <TableTitle>Группы</TableTitle>
              <TableHeaderActions>
                <PrimaryButton onClick={onAddClick}>Добавить</PrimaryButton>
              </TableHeaderActions>
            </TableHeader>
          </Cell>
        </Row>
        <Row>
          <Cell>id</Cell>
          <Cell>Название</Cell>
          <Cell>Действия</Cell>
        </Row>
      </Head>
      <Body>
        {groups?.map(({ id, name }) => {
          return (
            <Row key={id} className={styles.row}>
              <Cell>{id}</Cell>
              <Cell>{name}</Cell>
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

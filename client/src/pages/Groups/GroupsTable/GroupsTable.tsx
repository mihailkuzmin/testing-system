import React from 'react'
import {
  Table,
  Title,
  Header,
  Actions,
  Cell,
  Row,
  Head,
  Body
} from '../../../components/Table'
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
            <Header>
              <Title>Группы</Title>
              <Actions>
                <PrimaryButton onClick={onAddClick}>Добавить</PrimaryButton>
              </Actions>
            </Header>
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

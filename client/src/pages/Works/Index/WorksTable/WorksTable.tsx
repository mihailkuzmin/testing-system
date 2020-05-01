import React from 'react'
import { navigate } from 'hookrouter'
import * as T from '../../../../components/Table'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '../../../../components/Buttons'
import styles from './WorksTable.module.css'

export const WorksTable = () => {
  const worksIsEmpty = false
  const date = new Date().toLocaleString()
  const works = [{ id: 1, name: 'Работа 1', openAt: date, closeAt: date }]

  return (
    <T.Table className={styles.table}>
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={5}>
            <T.Header>
              <T.Title>Работы</T.Title>
              <T.Actions>
                <Add onClick={() => navigate('/works/add')}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>№</T.Cell>
          <T.Cell>Название</T.Cell>
          <T.Cell>Открытие</T.Cell>
          <T.Cell>Закрытие</T.Cell>
          <T.Cell align='center'>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {worksIsEmpty ? (
          <T.Row>
            <T.Cell>Список работ пока пуст</T.Cell>
            <T.Cell colSpan={4}></T.Cell>
          </T.Row>
        ) : (
          works.map((work, index) => (
            <T.Row key={work.id} className={styles.row}>
              <T.Cell>{index + 1}</T.Cell>
              <T.Cell>{work.name}</T.Cell>
              <T.Cell>{work.openAt}</T.Cell>
              <T.Cell>{work.closeAt}</T.Cell>
              <T.Cell>
                <div className={styles.actions}>
                  <Edit onClick={() => {}} />
                  <Delete onClick={() => {}} />
                </div>
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

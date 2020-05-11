import React from 'react'
import { useStore } from 'effector-react'
import { navigate } from 'hookrouter'
import * as T from '@components/Table'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
  PreviewButton as Preview,
} from '@components/Buttons'
import { worksTable } from '../../model/index'
import styles from './WorksTable.module.css'
import { DeleteWork } from './DeleteWork'

export const WorksTable = () => {
  const works = useStore(worksTable.$works)
  const worksIsEmpty = works.length === 0

  return (
    <T.Table className={styles.table}>
      <DeleteWork />
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
                  <Preview onClick={() => navigate(`/works/preview/${work.id}`)} />
                  <Edit onClick={() => {}} />
                  <Delete onClick={() => worksTable.selectForDelete(work.id)} />
                </div>
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

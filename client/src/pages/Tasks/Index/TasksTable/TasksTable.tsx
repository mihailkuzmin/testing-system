import React from 'react'
import { useStore } from 'effector-react'
import { navigate } from 'hookrouter'
import * as T from '../../../../components/Table'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
  PreviewButton as Preview,
} from '../../../../components/Buttons'
import { Modal } from '../../../../components'
import { DeleteTask } from './DeleteTask'
import { tasksTable } from '../../model/index'
import styles from './TasksTable.module.css'

export const TasksTable = () => {
  const tasks = useStore(tasksTable.$tasks)
  const taskForDelete = useStore(tasksTable.$taskForDelete)

  const deleteTaskExists = taskForDelete !== null
  const tasksisEmpty = tasks.length === 0

  return (
    <T.Table className={styles.table}>
      <Modal open={deleteTaskExists} onClose={tasksTable.cancelDelete}>
        <DeleteTask />
      </Modal>
      <T.Head className={styles.head}>
        <T.Row>
          <T.Cell colSpan={3}>
            <T.Header>
              <T.Title>Задания</T.Title>
              <T.Actions>
                <Add onClick={() => navigate('/tasks/add')}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>№</T.Cell>
          <T.Cell>Название</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {tasksisEmpty ? (
          <T.Row>
            <T.Cell>Список заданий пока пуст</T.Cell>
            <T.Cell colSpan={2}></T.Cell>
          </T.Row>
        ) : (
          tasks.map((task, index) => (
            <T.Row key={task.id}>
              <T.Cell>{index + 1}</T.Cell>
              <T.Cell>{task.name}</T.Cell>
              <T.Cell>
                <div className={styles.actions}>
                  <Preview
                    prompt='Просмотреть описание'
                    onClick={() => navigate(`/tasks/preview/${task.id}`)}
                  />
                  <Edit onClick={() => navigate(`/tasks/edit/${task.id}`)} />
                  <Delete onClick={() => tasksTable.selectForDelete(task.id)} />
                </div>
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

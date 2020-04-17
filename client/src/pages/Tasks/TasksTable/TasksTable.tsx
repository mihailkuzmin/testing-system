import React from 'react'
import { useStore } from 'effector-react'
import * as T from '../../../components/Table'
import {
  PrimaryButton as Add,
  EditButton as Edit,
  DeleteButton as Delete,
} from '../../../components/Buttons'
import { Modal } from '../../../components'
import { DeleteTask } from './DeleteTask'
import { tasksTable } from '../model'
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
          <T.Cell colSpan={5}>
            <T.Header>
              <T.Title>Задания</T.Title>
              <T.Actions>
                <Add onClick={tasksTable.addTask}>Добавить</Add>
              </T.Actions>
            </T.Header>
          </T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>id</T.Cell>
          <T.Cell>Описание</T.Cell>
          <T.Cell>Пример входных данных</T.Cell>
          <T.Cell>Пример выходных данных</T.Cell>
          <T.Cell>Действия</T.Cell>
        </T.Row>
      </T.Head>
      <T.Body>
        {tasksisEmpty ? (
          <T.Row>
            <T.Cell>Список заданий пока пуст</T.Cell>
            <T.Cell colSpan={4}></T.Cell>
          </T.Row>
        ) : (
          tasks.map((task) => (
            <T.Row key={task.id}>
              <T.Cell>{task.id}</T.Cell>
              <T.Cell>{task.description}</T.Cell>
              <T.Cell>{task.exampleInput}</T.Cell>
              <T.Cell>{task.exampleOutput}</T.Cell>
              <T.Cell className={styles.actions}>
                <Edit onClick={() => tasksTable.editTask(task.id)} />
                <Delete onClick={() => tasksTable.selectForDelete(task.id)} />
              </T.Cell>
            </T.Row>
          ))
        )}
      </T.Body>
    </T.Table>
  )
}

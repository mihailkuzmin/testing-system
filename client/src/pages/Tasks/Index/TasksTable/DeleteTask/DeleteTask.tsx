import React from 'react'
import { useStore } from 'effector-react'
import {
  PrimaryButton as Confirm,
  SecondaryButton as Cancel,
} from '../../../../../components/Buttons'
import { tasksTable } from '../../../model'
import styles from './DeleteTask.module.css'

export const DeleteTask = () => {
  const task = useStore(tasksTable.$taskForDelete)

  return (
    <div className={styles.deleteTask}>
      <h3 className={styles.title}>Удалить задание</h3>
      <p>Вы уверены, что хотите удалить задание {task?.id}?</p>
      <div className={styles.actions}>
        <Confirm onClick={tasksTable.confirmDelete}>Удалить</Confirm>
        <Cancel onClick={tasksTable.cancelDelete}>Отмена</Cancel>
      </div>
    </div>
  )
}

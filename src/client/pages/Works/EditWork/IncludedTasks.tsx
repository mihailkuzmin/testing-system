import React from 'react'
import { useStore } from 'effector-react'
import { DeleteButton as Delete } from '@components/Buttons'
import { TaskId } from '@common/typings/task'
import { editForm } from '../model/editWork/editForm'
import { Task } from './Task'
import styles from './EditWork.module.css'

export const IncludedTasks = () => {
  const tasks = useStore(editForm.$selectedTasks)
  const tasksIsEmpty = tasks.length === 0

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id)

    editForm.deleteTask(id as TaskId)
  }

  return (
    <div className={styles.includedTasks}>
      <div className={styles.flexBetween}>
        <h3>Задания в работе</h3>
        <span>Заданий: {tasks.length}</span>
      </div>
      <div className={styles.tasksList}>
        {tasksIsEmpty ? (
          <div className={styles.emptyList}>
            <span>Добавьте задания к работе из списка ниже</span>
          </div>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} id={task.id} name={task.name} topic={task.topic.name}>
              <Delete data-id={task.id} onClick={onDeleteClick} />
            </Task>
          ))
        )}
      </div>
    </div>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { DeleteButton as Delete } from '@components/Buttons'
import { addForm } from '../model/addWork/addForm'
import { Task } from './Task'
import styles from './AddWork.module.css'

export const IncludedTasks = () => {
  const tasks = useStore(addForm.$selectedTasks)
  const tasksIsEmpty = tasks.length === 0

  //TODO bind to effector
  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset

    console.log({ delete: id })
  }

  return (
    <div className={styles.includedTasks}>
      <div className={styles.flexBetween}>
        <h3>Задания в работе</h3>
        <span>Заданий: {tasks.length}</span>
      </div>
      <div className={styles.tasksList}>
        {tasksIsEmpty ? (
          <p>Список заданий пока пуст</p>
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

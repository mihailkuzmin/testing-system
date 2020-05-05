import React from 'react'
import { Task } from './Task'
import { DeleteButton as Delete } from '../../../components/Buttons'
import styles from './AddWork.module.css'

export const IncludedTasks = () => {
  const tasks = [
    { id: 1, name: 'Task 1', topic: 'Массивы' },
    { id: 2, name: 'Task 2', topic: 'Массивы' },
    { id: 6, name: 'Task 6', topic: 'Графы' },
  ]

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
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} name={task.name} topic={task.topic}>
            <Delete data-id={task.id} onClick={onDeleteClick} />
          </Task>
        ))}
      </div>
    </div>
  )
}

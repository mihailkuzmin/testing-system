import React from 'react'
import { Task } from './Task'
import { PlusButton as Add } from '../../../components/Buttons'
import { Item, Select } from '../../../components/Inputs/Select'
import styles from './AddWork.module.css'

export const AllTasks = () => {
  const tasks = [{ id: 4, name: 'Task 4', topic: 'Строки' }]

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset

    console.log({ add: id })
  }

  return (
    <div className={styles.allTasks}>
      <div className={styles.flexBetween}>
        <h3>Все задания</h3>
        <Select value={2} label='Тема'>
          <Item value={0}>Массивы</Item>
          <Item value={1}>Графы</Item>
          <Item value={2}>Строки</Item>
        </Select>
      </div>
      <div className={styles.tasksList}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} name={task.name} topic={task.topic}>
            <Add data-id={4} onClick={onAddClick} />
          </Task>
        ))}
      </div>
    </div>
  )
}

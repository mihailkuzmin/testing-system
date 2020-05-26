import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { $tasks } from '@pages/Begin/model'
import styles from './TaskList.module.css'

export const TaskList = () => {
  const tasks = useStore($tasks)

  return (
    <Card>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.item}>
            {task.name}
          </li>
        ))}
      </ul>
    </Card>
  )
}

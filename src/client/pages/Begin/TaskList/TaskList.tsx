import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { List, ListItem } from '@material-ui/core'
import { workspace } from '../model'
import styles from './TaskList.module.css'

export const TaskList = () => {
  const timeLeft = useStore(workspace.$timeLeft)
  const { runPending } = useStore(workspace.$codeEditor)
  const { tasks, selectedId } = useStore(workspace.$tasks)

  return (
    <div className={styles.wrap}>
      <Card className={styles.taskList}>
        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={task.id}
              onClick={() => workspace.taskChanged(task.id)}
              disabled={runPending}
              selected={task.id === selectedId}
              button
            >
              {index + 1}. {task.name}
            </ListItem>
          ))}
        </List>
      </Card>
      <div className={styles.timeLeft}>
        <span>Осталось:</span>
        <span>{timeLeft}</span>
      </div>
    </div>
  )
}

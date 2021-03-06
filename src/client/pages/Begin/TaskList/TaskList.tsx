import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { List, ListItem } from '@material-ui/core'
import { workspace } from '../model'
import styles from './TaskList.module.css'

export const TaskList = () => {
  const { runPending } = useStore(workspace.$codeEditor)
  const { tasks, selectedId } = useStore(workspace.$tasks)

  return (
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
  )
}

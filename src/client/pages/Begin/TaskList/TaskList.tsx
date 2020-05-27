import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { List, ListItem } from '@material-ui/core'
import { workspace } from '../model'

export const TaskList = () => {
  const { tasks, selected } = useStore(workspace.$tasks)

  return (
    <Card>
      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            onClick={() => workspace.taskChanged(task.id)}
            selected={selected?.id === task.id}
            button
          >
            {index + 1}. {task.name}
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

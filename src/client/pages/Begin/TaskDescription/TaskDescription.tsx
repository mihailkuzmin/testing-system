import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { workspace } from '../model'
import styles from './TaskDescription.module.css'

export const TaskDescription = () => {
  const { selected } = useStore(workspace.$tasks)

  return (
    <Card className={styles.taskDescription}>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: selected?.description ?? '' }}
      />
    </Card>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { workspace } from '../model'
import styles from './SelectedTask.module.css'

export const SelectedTask = () => {
  const { selected } = useStore(workspace.$tasks)

  return (
    <Card className={styles.card}>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: selected?.description ?? '' }}
      />
    </Card>
  )
}

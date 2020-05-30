import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { Circular as Loader } from '@components/Loaders'
import { workspace } from '../model'
import { TestList } from './TestList'
import styles from './TaskDescription.module.css'

export const TaskDescription = () => {
  const { selectedTaskInfo, taskInfoIsLoading } = useStore(workspace.$tasks)

  return (
    <Card className={styles.taskDescription}>
      {taskInfoIsLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.description}>
          <div dangerouslySetInnerHTML={{ __html: selectedTaskInfo?.description ?? '' }} />
          <Divider />
          <TestList />
        </div>
      )}
    </Card>
  )
}

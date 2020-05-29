import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { Circular as Loader } from '@components/Loaders'
import { workspace } from '../model'
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

          <h3>Примеры входных и выходных данных</h3>
          <div className={styles.testList}>
            {selectedTaskInfo?.tests?.map((test) => (
              <div key={test.id} className={styles.test}>
                <div>
                  <span>Пример входных данных</span>
                  <div>{test.input}</div>
                </div>
                <div>
                  <span>Пример выходных данных</span>
                  <div>{test.output}</div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { Divider } from '@components'
import { workspace } from '@pages/Begin/model'
import styles from './TestList.module.css'

export const TestList = () => {
  const { selectedTaskInfo } = useStore(workspace.$tasks)

  return (
    <>
      <h3>Примеры входных и выходных данных</h3>
      <div className={styles.list}>
        {selectedTaskInfo?.tests?.map((test, index, arr) => {
          const isLast = index === arr.length - 1
          return (
            <div key={test.id} className={styles.test}>
              <div>
                <span>Пример входных данных</span>
                <div>{test.input}</div>
              </div>
              <div>
                <span>Пример выходных данных</span>
                <div>{test.output}</div>
              </div>
              {!isLast && <Divider />}
            </div>
          )
        })}
      </div>
    </>
  )
}

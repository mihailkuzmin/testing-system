import React from 'react'
import { useStore } from 'effector-react'
import { IconButton } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Card, Divider } from '@components'
import { userReport } from '@pages/UserReport/model'
import { Circular } from '@components/Loaders'
import styles from './styles.module.css'

type TaskProps = {
  number: number
  taskName: string
  selected: boolean
  testsPassed: number
  testsCount: number
  onExpand: () => void
  onCollapse: () => void
}

export const Task = (props: TaskProps) => {
  const { selectedTask, selectedTaskResult, taskInfoIsLoading } = useStore(userReport.$tasks)

  return (
    <Card className={styles.card}>
      <div className={styles.task}>
        <span>{props.number}.</span>
        <span>{props.taskName}</span>
        <span>
          Пройдено тестов: {props.testsPassed} из {props.testsCount}
        </span>
        {props.selected ? (
          <IconButton onClick={props.onCollapse}>
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton onClick={props.onExpand}>
            <ExpandMore />
          </IconButton>
        )}
      </div>
      {props.selected && (
        <>
          <Divider />
          {taskInfoIsLoading ? (
            <div className={styles.loader}>
              <Circular />
            </div>
          ) : (
            <div className={styles.taskInfo}>
              <h4>Описание:</h4>
              <div dangerouslySetInnerHTML={{ __html: selectedTask?.description ?? '' }} />
              <Divider />
              <h4>Код:</h4>
              <div className={styles.code}>{selectedTaskResult?.code}</div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

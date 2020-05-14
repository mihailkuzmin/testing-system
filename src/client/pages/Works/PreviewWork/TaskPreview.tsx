import React from 'react'
import { Task } from '@common/typings/task'
import { Divider } from '@material-ui/core'
import styles from './PreviewWork.module.css'

type TaskPreviewProps = Task & { number: number }

export const TaskPreview = (props: TaskPreviewProps) => (
  <div className={styles.taskPreview}>
    <div className={styles.taskHeader}>
      <h3>Задание {props.number}</h3>
      <span>Тема: {props.topic.name}</span>
    </div>

    <div dangerouslySetInnerHTML={{ __html: props.description ?? '' }}></div>

    <Divider />

    <div className={styles.tests}>
      {props.tests?.map((test) => (
        <React.Fragment key={test.id}>
          <div>
            <span>Пример входных данных</span>
            <div>{test.input}</div>
          </div>
          <div>
            <span>Пример выходных данных</span>
            <div>{test.output}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
)

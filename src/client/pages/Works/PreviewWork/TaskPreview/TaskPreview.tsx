import React from 'react'
import { Task } from '@common/typings/task'
import { Divider } from '@material-ui/core'
import styles from './TaskPreview.module.css'

type TaskPreviewProps = Task & { number: number }

export const TaskPreview = (props: TaskPreviewProps) => (
  <div className={styles.task}>
    <div className={styles.header}>
      <h3>Задание {props.number}</h3>
      <span>Тема: {props.topic.name}</span>
    </div>

    <div dangerouslySetInnerHTML={{ __html: props.description ?? '' }} />

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

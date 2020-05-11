import React from 'react'
import { TaskPreview } from '@common/typings/task'
import { Divider } from '@material-ui/core'
import styles from './PreviewWork.module.css'

type TaskPreviewProps = TaskPreview & { number: number }

export const Task = (props: TaskPreviewProps) => (
  <div className={styles.taskPreview}>
    <h3>Задание {props.number}</h3>
    <div dangerouslySetInnerHTML={{ __html: props.description ?? '' }}></div>

    <Divider />

    <div className={styles.tests}>
      <div>
        <span>Пример входных данных</span>
        <div>{props.test.input}</div>
      </div>
      <div>
        <span>Пример выходных данных</span>
        <div>{props.test.output}</div>
      </div>
    </div>
  </div>
)

import React from 'react'
import { PreviewButton as Preview } from '../../../components/Buttons'
import styles from './AddWork.module.css'

type TaskProps = {
  id: number | string
  name: string
  topic: string
  children: React.ReactNode
}

export const Task = (props: TaskProps) => (
  <div className={styles.task}>
    <div>Название: {props.name}</div>
    <div>Тема: {props.topic}</div>
    <div className={styles.actions}>
      <a href={`/tasks/preview/${props.id}`} target='_blank' rel='noopener noreferrer'>
        <Preview />
      </a>
      {props.children}
    </div>
  </div>
)

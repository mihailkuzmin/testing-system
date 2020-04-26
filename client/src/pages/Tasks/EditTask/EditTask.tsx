import React from 'react'
import styles from './EditTask.module.css'

type EditTaskProps = {
  id: number
}

export const EditTask = ({ id }: EditTaskProps) => {
  return <div className={styles.edit}>Edit task {id}</div>
}

import React from 'react'
import { PrimaryButton as Save } from '../../../components/Buttons'
import { Paper, Divider } from '../../../components'
import { IncludedTasks } from './IncludedTasks'
import { AllTasks } from './AllTasks'
import styles from './AddWork.module.css'

export const AddWork = () => {
  return (
    <Paper className={styles.addWork}>
      <div className={styles.header}>
        <h2>Добавить работу</h2>
        <Save>Сохранить</Save>
      </div>
      <Divider />
      <IncludedTasks />
      <Divider />
      <AllTasks />
    </Paper>
  )
}

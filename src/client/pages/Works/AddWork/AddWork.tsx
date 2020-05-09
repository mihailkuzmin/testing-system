import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton as Save } from '@components/Buttons'
import { Paper, Divider } from '@components'
import { PageLoader, PageError } from '@components/Loaders'
import { AddWorkPage } from '../model/addWork'
import { IncludedTasks } from './IncludedTasks'
import { AllTasks } from './AllTasks'
import styles from './AddWork.module.css'

export const AddWork = () => {
  React.useEffect(AddWorkPage.onMount, [])

  const { isLoading, isFail } = useStore(AddWorkPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

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

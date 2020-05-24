import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton as Save } from '@components/Buttons'
import { Paper, Divider } from '@components'
import { PageLoader, PageError } from '@components/Loaders'
import { addForm, AddWorkPage } from '../model/addWork'
import { IncludedTasks } from './IncludedTasks'
import { AllTasks } from './AllTasks'
import { CloseDateInput, NameInput, OpenDateInput } from './Inputs'
import styles from './AddWork.module.css'
import { GroupsList } from '@pages/Works/AddWork/GroupsList'

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
        <Save onClick={() => addForm.addWork()}>Сохранить</Save>
      </div>
      <NameInput />

      <div className={styles.dates}>
        <OpenDateInput />
        <CloseDateInput />
      </div>

      <h3>Назначьте работу группам</h3>
      <GroupsList />
      <Divider />
      <IncludedTasks />
      <Divider />
      <AllTasks />
    </Paper>
  )
}

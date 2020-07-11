import React from 'react'
import { useStore } from 'effector-react'
import { WorkId } from '@common/typings/work'
import { PageLoader, PageError } from '@components/Loaders'
import { Paper, Divider } from '@components'
import { PrimaryButton as Save } from '@components/Buttons'
import { EditPage, editForm } from '../model/editWork'
import { CloseDateInput, NameInput, OpenDateInput, TimeToCompleteInput } from './Inputs'
import { IncludedTasks } from './IncludedTasks'
import { AllTasks } from './AllTasks'
import { GroupList } from './GroupList'
import styles from './EditWork.module.css'

type EditWorkProps = { id: WorkId }

export const EditWork = ({ id }: EditWorkProps) => {
  React.useEffect(() => EditPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(EditPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.editWork}>
      <div className={styles.header}>
        <h2>Редактировать работу</h2>
        <Save onClick={() => editForm.updateWork()}>Сохранить</Save>
      </div>
      <NameInput />

      <div className={styles.dates}>
        <OpenDateInput />
        <CloseDateInput />
        <TimeToCompleteInput />
      </div>

      <h3>Назначьте работу группам</h3>
      <GroupList />
      <Divider />
      <IncludedTasks />
      <Divider />
      <AllTasks />
    </Paper>
  )
}

import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '@components/Loaders'
import { Paper } from '@components'
import { WorkId } from '@common/typings/work'
import { Divider } from '@material-ui/core'
import { PrimaryButton as Save } from '@components/Buttons'
import { addForm } from '@pages/Works/model/addWork'
import { EditPage, editForm } from '../model/editWork'
import { CloseDateInput, NameInput, OpenDateInput } from './Inputs'
import { IncludedTasks } from './IncludedTasks'
import { AllTasks } from './AllTasks'
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
        <Save onClick={() => addForm.addWork()}>Сохранить</Save>
      </div>
      <NameInput />
      <div className={styles.dates}>
        <OpenDateInput />
        <CloseDateInput />
      </div>
      <Divider />
      <IncludedTasks />
      <Divider />
      <AllTasks />
    </Paper>
  )
}
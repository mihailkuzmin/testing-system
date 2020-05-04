import React from 'react'
import { useStore } from 'effector-react'
import { Paper } from '../../../components'
import { CheckBox } from '../../../components/Inputs'
import { PrimaryButton as Save } from '../../../components/Buttons'
import { PageLoader, PageError } from '../../../components/Loaders'
import { EditPage, editForm, tests } from '../model/editTask'
import { TaskId } from '../model/editTask/editForm/typings'
import { NameInput, DescriptionInput, TopicSelect } from './Inputs'
import { TestsCounter } from './TestsCounter'
import { Loader } from './Loader'
import { Tests } from './Tests'
import styles from './EditTask.module.css'

type EditTaskProps = { id: TaskId }

export const EditTask = ({ id }: EditTaskProps) => {
  React.useEffect(() => EditPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(EditPage.$status)
  const editTests = useStore(tests.$editTests)
  const testsAreLoading = useStore(tests.$testsAreLoading)
  const testsCount = useStore(tests.$testsCount)

  const showTests = editTests && !testsAreLoading && testsCount > 0
  const showCounter = editTests && !testsAreLoading

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editForm.saveChanges()
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.editTask}>
      <div className={styles.header}>
        <h2>Редактировать задание</h2>
        <Save form='editTaskForm' type='submit'>
          Сохранить
        </Save>
      </div>
      <form id='editTaskForm' className={styles.editForm} onSubmit={onSubmit}>
        <NameInput />
        <TopicSelect />
        <DescriptionInput />
        <div className={styles.testsControl}>
          <div className={styles.editControl}>
            <CheckBox checked={editTests} onChange={() => tests.toggleEditTests(!editTests)} />
            <h3>Редактировать тесты</h3>
            {testsAreLoading && <Loader />}
          </div>
          {showCounter && <TestsCounter count={testsCount} onClick={() => tests.addTest()} />}
        </div>
        {showTests && <Tests />}
      </form>
    </Paper>
  )
}

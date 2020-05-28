import React from 'react'
import { useStore } from 'effector-react'
import { Paper, Divider } from '@components'
import { PageLoader, PageError } from '@components/Loaders'
import { PrimaryButton as Save } from '@components/Buttons'
import { addForm, AddTaskPage } from '../model/addTask'
import { NameInput, DescriptionInput, TopicSelect } from './Inputs'
import { TestsCounter } from './TestsCounter'
import { TestList } from './TestList'
import styles from './AddTask.module.css'

export const AddTask = () => {
  React.useEffect(AddTaskPage.onMount, [])

  const { isLoading, isFail } = useStore(AddTaskPage.$status)
  const testsCount = useStore(addForm.$testsCount)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addForm.createTask()
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.addTask}>
      <div className={styles.header}>
        <h2>Добавить задание</h2>
        <Save form='addTaskForm' type='submit'>
          Сохранить
        </Save>
      </div>

      <Divider />

      <form id='addTaskForm' className={styles.addForm} onSubmit={onSubmit}>
        <NameInput />
        <TopicSelect />
        <DescriptionInput />

        <Divider />

        <div className={styles.testsControl}>
          <h3>Добавьте тесты к заданию</h3>
          <TestsCounter count={testsCount} onClick={() => addForm.addTest()} />
        </div>
        <TestList />
      </form>
    </Paper>
  )
}

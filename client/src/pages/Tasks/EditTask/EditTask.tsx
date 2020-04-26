import React from 'react'
import { useStore } from 'effector-react'
import { Paper, Editor } from '../../../components'
import { Input, CheckBox } from '../../../components/Inputs'
import { PrimaryButton as Save } from '../../../components/Buttons'
import { PageLoader, PageError } from '../../../components/Loaders'
import { EditPage, editForm } from '../model/editTask'
import styles from './EditTask.module.css'

type EditTaskProps = {
  id: number
}

export const EditTask = ({ id }: EditTaskProps) => {
  React.useEffect(() => EditPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(EditPage.$status)

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
      <form id='editTaskForm' className={styles.editForm} onSubmit={() => {}}>
        <NameInput />
        <DescriptionInput />
        <div className={styles.editTestsBox}>
          <CheckBox onChange={() => {}} />
          <h3>Редактировать тесты</h3>
        </div>
      </form>
    </Paper>
  )
}

const DescriptionInput = () => {
  const description = useStore(editForm.$description)

  return <Editor content={description} onChange={() => {}} />
}

const NameInput = () => {
  const name = useStore(editForm.$name)

  return <Input value={name} onChange={() => {}} label='Название задания' />
}

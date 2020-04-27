import React from 'react'
import { useStore, useStoreMap, useList } from 'effector-react'
import { Paper, Editor } from '../../../components'
import { Input, CheckBox } from '../../../components/Inputs'
import {
  PrimaryButton as Save,
  PlusButton as Add,
  MinusButton as Remove,
} from '../../../components/Buttons'
import { Circular, PageLoader, PageError } from '../../../components/Loaders'
import { EditPage, editForm } from '../model/editTask'
import { UpdateTestId, TaskId } from '../model/editTask/editForm/typings'
import styles from './EditTask.module.css'

type EditTaskProps = { id: TaskId }

type ExampleInputProps = { id: UpdateTestId }
type ExampleOutputProps = { id: UpdateTestId }

type TestControlProps = { onAdd: any; onRemove: any }

export const EditTask = ({ id }: EditTaskProps) => {
  React.useEffect(() => EditPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(EditPage.$status)
  const editTests = useStore(editForm.$editTests)
  const testsAreLoading = useStore(editForm.$testsAreLoading)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editForm.editTask()
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
        <DescriptionInput />
        <div
          className={styles.editTestsBox}
          style={!editTests ? { gridColumnStart: 1, gridColumnEnd: 3 } : {}}
        >
          <CheckBox checked={editTests} onChange={() => editForm.toggleEditTests(!editTests)} />
          <h3>Редактировать тесты</h3>
          {testsAreLoading && <TestsLoader />}
        </div>
        {editTests && !testsAreLoading && (
          <>
            <TestControl onAdd={editForm.addTest} onRemove={editForm.removeTest} />
            <Tests />
          </>
        )}
      </form>
    </Paper>
  )
}

const DescriptionInput = () => {
  const description = useStore(editForm.$description)

  return (
    <Editor content={description} onChange={(content) => editForm.descriptionChange(content)} />
  )
}

const NameInput = () => {
  const name = useStore(editForm.$name)

  return (
    <Input
      value={name}
      onChange={(e) => editForm.nameChange(e.target.value)}
      label='Название задания'
    />
  )
}

const Tests = () => {
  const tests = useList(editForm.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
    </React.Fragment>
  ))

  return tests
}

const TestControl = ({ onAdd, onRemove }: TestControlProps) => {
  const count = useStore(editForm.$testsCount)

  return (
    <div className={styles.testsControl}>
      <span>Тестов: {count}</span>
      <Add onClick={onAdd} />
      <Remove onClick={onRemove} />
    </div>
  )
}

const ExampleInput = ({ id }: ExampleInputProps) => {
  const value = useStoreMap({
    store: editForm.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.input || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => editForm.inputChange({ id, value: e.target.value })}
      label='Пример входных данных'
      multiline
    />
  )
}

const ExampleOutput = ({ id }: ExampleOutputProps) => {
  const value = useStoreMap({
    store: editForm.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.output || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => editForm.outputChange({ id, value: e.target.value })}
      label='Пример выходных данных'
      multiline
    />
  )
}

const TestsLoader = () => (
  <div className={styles.testsLoader}>
    <Circular />
  </div>
)

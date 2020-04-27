import React from 'react'
import { useStore, useStoreMap, useList } from 'effector-react'
import { Paper, Editor } from '../../../components'
import { Input, CheckBox } from '../../../components/Inputs'
import {
  PrimaryButton as Save,
  PlusButton as Add,
  DeleteButton as Delete,
} from '../../../components/Buttons'
import { Circular, PageLoader, PageError } from '../../../components/Loaders'
import { EditPage, editForm, tests } from '../model/editTask'
import { UpdateTestId, TaskId } from '../model/editTask/editForm/typings'
import styles from './EditTask.module.css'

type EditTaskProps = { id: TaskId }

type ExampleInputProps = { id: UpdateTestId }
type ExampleOutputProps = { id: UpdateTestId }

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

type TestsCounterProps = { count: number; onClick: () => void }

const TestsCounter = ({ count, onClick }: TestsCounterProps) => (
  <div className={styles.testsCounter}>
    <span>Тестов: {count}</span>
    <Add onClick={onClick} />
  </div>
)

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
  const list = useList(tests.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
      <Delete onClick={() => tests.removeTest(test.id)} />
    </React.Fragment>
  ))

  return <div className={styles.testsList}>{list}</div>
}

const ExampleInput = ({ id }: ExampleInputProps) => {
  const value = useStoreMap({
    store: tests.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.input || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => tests.inputChange({ id, value: e.target.value })}
      label='Пример входных данных'
      multiline
    />
  )
}

const ExampleOutput = ({ id }: ExampleOutputProps) => {
  const value = useStoreMap({
    store: tests.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.output || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => tests.outputChange({ id, value: e.target.value })}
      label='Пример выходных данных'
      multiline
    />
  )
}

const Loader = () => (
  <div className={styles.testsLoader}>
    <Circular />
  </div>
)

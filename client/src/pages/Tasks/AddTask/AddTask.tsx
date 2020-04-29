import React from 'react'
import { useList, useStore, useStoreMap } from 'effector-react'
import { Editor, Paper } from '../../../components'
import { Input } from '../../../components/Inputs'
import {
  DeleteButton as Delete,
  PlusButton as Add,
  PrimaryButton as Save,
} from '../../../components/Buttons'
import { addTask } from '../model/addTask'
import { TestId } from '../model/addTask/typings'
import styles from './AddTask.module.css'

type ExampleInputProps = { id: TestId }
type ExampleOutputProps = ExampleInputProps

type TestCounterProps = { count: number; onClick: () => void }

export const AddTask = () => {
  const testsCount = useStore(addTask.$testsCount)

  // TODO: add on mount event
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask.createTask()
  }

  return (
    <Paper className={styles.addTask}>
      <div className={styles.header}>
        <h2>Добавить задание</h2>
        <Save form='addTaskForm' type='submit'>
          Сохранить
        </Save>
      </div>
      <form id='addTaskForm' className={styles.addForm} onSubmit={onSubmit}>
        <NameInput />
        <DescriptionInput />
        <div className={styles.testsControl}>
          <h3>Добавьте тесты к заданию</h3>
          <TestsCounter count={testsCount} onClick={() => addTask.addTest()} />
        </div>
        <Tests />
      </form>
    </Paper>
  )
}

const TestsCounter = ({ count, onClick }: TestCounterProps) => (
  <div className={styles.testsCounter}>
    <span>Тестов: {count}</span>
    <Add onClick={onClick} />
  </div>
)

const Tests = () => {
  const list = useList(addTask.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
      <Delete />
    </React.Fragment>
  ))

  return <div className={styles.testsList}>{list}</div>
}

const ExampleInput = ({ id }: ExampleInputProps) => {
  const value = useStoreMap({
    store: addTask.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.input || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => addTask.inputChange({ id, value: e.target.value })}
      label='Пример входных данных'
      multiline
    />
  )
}

const ExampleOutput = ({ id }: ExampleOutputProps) => {
  const value = useStoreMap({
    store: addTask.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.output || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => addTask.outputChange({ id, value: e.target.value })}
      label='Пример выходных данных'
      multiline
    />
  )
}

const NameInput = () => {
  const name = useStore(addTask.$name)

  return (
    <Input
      value={name}
      onChange={(e) => addTask.nameChange(e.target.value)}
      label='Название задания'
    />
  )
}

const DescriptionInput = () => {
  const description = useStore(addTask.$description)

  return <Editor content={description} onChange={addTask.descriptionChange} />
}

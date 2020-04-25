import React from 'react'
import { useStore, useList, useStoreMap } from 'effector-react'
import { Paper } from '../../../components'
import { Input } from '../../../components/Inputs'
import {
  PrimaryButton as Save,
  PlusButton as Add,
  MinusButton as Remove,
} from '../../../components/Buttons'
import { Editor } from './Editor'
import { addTask } from '../model/addTask'
import styles from './AddTask.module.css'

export const AddTask = () => {
  const desc = useStore(addTask.$description)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask.createTask()
  }

  return (
    <Paper className={styles.addTask}>
      <div className={styles.header}>
        <h2 className={styles.title}>Добавить задание</h2>
        <Save form='addTaskForm' type='submit'>
          Сохранить
        </Save>
      </div>
      <form id='addTaskForm' className={styles.addForm} onSubmit={onSubmit}>
        <Editor content={desc} onChange={addTask.descriptionChange} />
        <div className={styles.testsCounter}>
          <h3>Добавьте тесты к заданию</h3>
          <TestControl onAdd={addTask.addTest} onRemove={addTask.removeTest} />
        </div>
        <Tests />
      </form>
    </Paper>
  )
}

type TestControlProps = {
  onAdd: any
  onRemove: any
}

const TestControl = ({ onAdd, onRemove }: TestControlProps) => {
  const count = useStore(addTask.$testsCount)
  return (
    <div className={styles.testsControl}>
      <span>Тестов: {count}</span>
      <Add onClick={onAdd} />
      <Remove onClick={onRemove} />
    </div>
  )
}

const Tests = () => {
  const tests = useList(addTask.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
    </React.Fragment>
  ))

  return <div className={styles.tests}>{tests}</div>
}

type ExampleInputProps = { id: number }
type ExampleOutputProps = ExampleInputProps

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

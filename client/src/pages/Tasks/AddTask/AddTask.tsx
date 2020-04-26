import React from 'react'
import { useStore, useList, useStoreMap } from 'effector-react'
import { Paper, Editor } from '../../../components'
import { Input } from '../../../components/Inputs'
import {
  PrimaryButton as Button,
  PlusButton as Add,
  MinusButton as Remove,
} from '../../../components/Buttons'
import { addTask } from '../model/addTask'
import styles from './AddTask.module.css'

export const AddTask = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask.createTask()
  }

  return (
    <Paper className={styles.addTask}>
      <div className={styles.header}>
        <h2>Добавить задание</h2>
        <Button form='addTaskForm' type='submit'>
          Добавить
        </Button>
      </div>
      <form id='addTaskForm' className={styles.addForm} onSubmit={onSubmit}>
        <NameInput />
        <DescriptionInput />
        <h3>Добавьте тесты к заданию</h3>
        <TestControl onAdd={addTask.addTest} onRemove={addTask.removeTest} />
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

  return tests
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
